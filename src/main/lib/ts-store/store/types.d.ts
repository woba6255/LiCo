import { Endpoint } from "./Endpoint";
export type StateType = Record<string, any>;
export type StoreType<STATE extends StateType> = {
    [K in keyof STATE]: STATE[K] extends StateType ? StoreType<STATE[K]> & Endpoint<STATE[K]> : Endpoint<STATE[K]>;
};
