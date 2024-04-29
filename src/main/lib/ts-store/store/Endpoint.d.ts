import { Json } from "../json.types";
import { TypedStore } from "./TypedStore";
export declare class Endpoint<VALUE extends Json = Json> {
    private readonly store;
    private readonly path;
    constructor(store: TypedStore<Json>, path: string[]);
    get(): Promise<VALUE>;
    set(value: VALUE): Promise<void>;
    delete(): Promise<void>;
}
