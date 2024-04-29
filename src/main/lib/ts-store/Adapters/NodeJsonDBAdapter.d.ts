import { Json } from "../json.types";
import { TypedStoreAdapter } from "../store/TypedStoreAdapter.js";
export declare class NodeJsonDBAdapter implements TypedStoreAdapter {
    private db;
    constructor(fileName?: string, humanReadable?: boolean);
    set(path: string, value: Json): Promise<void>;
    get(path: string): Promise<any>;
    delete(path: string): Promise<void>;
    private fixPath;
}
