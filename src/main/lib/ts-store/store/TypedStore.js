export class TypedStore {
    adapter;
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(path) {
        return this.adapter.get(this.joinPath(path));
    }
    set(path, value) {
        return this.adapter.set(this.joinPath(path), value);
    }
    delete(path) {
        return this.adapter.delete(this.joinPath(path));
    }
    get store() {
        return getProxy([], this);
    }
    joinPath(path) {
        return path.join('/');
    }
}
function getProxy(path, store) {
    return new Proxy((() => {
    }), {
        get(target, p, receiver) {
            return getProxy([...path, p.toString()], store);
        },
        apply(target, thisArg, argArray) {
            const lastPath = path[path.length - 1];
            const pathToMethod = path.slice(0, -1);
            if (lastPath === 'get') {
                return store.get(pathToMethod);
            }
            if (lastPath === 'set') {
                return store.set(pathToMethod, argArray[0]);
            }
            if (lastPath === 'delete') {
                console.log('get', pathToMethod);
            }
            throw new Error(`Unknown method ${lastPath}`);
        }
    });
}
