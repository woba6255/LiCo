import { Config, JsonDB } from 'node-json-db';
export class NodeJsonDBAdapter {
    db;
    constructor(fileName = 'db.json', humanReadable = true) {
        this.db = new JsonDB(new Config(fileName, true, humanReadable, '/'));
    }
    set(path, value) {
        return this.db.push(this.fixPath(path), value);
    }
    get(path) {
        return this.db.getData(this.fixPath(path));
    }
    delete(path) {
        return this.db.delete(this.fixPath(path));
    }
    fixPath(path) {
        return `fixedField/${path}`;
    }
}
