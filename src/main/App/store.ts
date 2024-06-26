import * as path from "node:path";
import { app } from "electron";
import { IWorkbench } from "common/Entities";
import { NodeJsonDBAdapter, TypedStore } from "main/lib/ts-store";
import { JsonValue } from "main/lib/ts-store/json.types";

type State = {
    isInitialized: boolean;
    startOnLogin: boolean;
    workbenches: Record<string, InterfaceToType<IWorkbench>>;
}

export type InterfaceToType<T> = {
    [K in keyof T]: T[K] extends JsonValue ? T[K] : never;
}

const initialState: State = {
    isInitialized: true,
    startOnLogin: false,
    workbenches: {}
}

class AppStore extends TypedStore<State> {
    constructor() {
        const jsonFile = path.join(app.getPath("userData"), "store.json");
        super(new NodeJsonDBAdapter(jsonFile));
    }

    async onAppInit() {
        try {
            await this.store.isInitialized.get();
        } catch (e) {
            await this.set([], initialState);
        }
    }
}

export const appStore = new AppStore();
export const store = appStore.store;
