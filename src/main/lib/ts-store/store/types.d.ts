import { Endpoint } from "./Endpoint.js";
export type StateType = Record<string, any>;
export type StoreType<STATE extends StateType> = {
    [K in keyof STATE]: STATE[K] extends StateType ? StoreType<STATE[K]> & Endpoint<STATE[K]> : Endpoint<STATE[K]>;
};
