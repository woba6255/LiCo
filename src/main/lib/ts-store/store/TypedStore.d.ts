import { Json } from "../json.types";
import { TypedStoreAdapter } from "./TypedStoreAdapter";
import { StateType, StoreType } from "./types.js";
export declare class TypedStore<T extends StateType> {
    private readonly adapter;
    constructor(adapter: TypedStoreAdapter);
    get(path: string[]): Promise<Json>;
    set(path: string[], value: Json): Promise<void>;
    delete(path: string[]): Promise<void>;
    get store(): StoreType<T>;
    private joinPath;
}
