import { app, ipcMain } from "electron";
import { store } from "./store.ts";

export class StartOnLogin {
    async onAppReady() {
        await this.#syncStore();

        ipcMain.on("set-start-on-login", (event, arg) => {
            this.#setStartOnLogin(arg);
        });

        ipcMain.handle("get-start-on-login", () => {
            return this.#getStartOnLogin();
        });
    }

    async #syncStore() {
        const startOnLoginElectron = app.getLoginItemSettings().openAtLogin;
        const startOnLoginStore = await this.#getStartOnLogin();

        if (startOnLoginElectron !== startOnLoginStore) {
            this.#setStartOnLogin(true);
        }
    }

    #setStartOnLogin(arg) {
        store.startOnLogin.set(arg);
        app.setLoginItemSettings({
            openAtLogin: arg,
            enabled: arg,
            args: ["--hidden"],
        });
    }

    async #getStartOnLogin() {
        return await store.startOnLogin.get();
    }
}

export const startOnLogin = new StartOnLogin();
