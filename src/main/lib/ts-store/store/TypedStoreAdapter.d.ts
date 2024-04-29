import { Json } from "../json.types";
export declare abstract class TypedStoreAdapter {
    abstract set(path: string, value: Json): Promise<void>;
    abstract get(path: string): Promise<Json>;
    abstract delete(path: string): Promise<void>;
}
