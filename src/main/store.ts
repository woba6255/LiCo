import * as path from "node:path";
import { app } from "electron";
import { NodeJsonDBAdapter, TypedStore } from "./lib/ts-store";

type State = {
    isInitialized: boolean;
    startOnLogin: boolean;
}

const initialState: State = {
    isInitialized: true,
    startOnLogin: false
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
