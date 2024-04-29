export class Endpoint {
    store;
    path;
    constructor(store, path) {
        this.store = store;
        this.path = path;
    }
    get() {
        return this.store.get(this.path);
    }
    set(value) {
        return this.store.set(this.path, value);
    }
    delete() {
        return this.store.delete(this.path);
    }
}
