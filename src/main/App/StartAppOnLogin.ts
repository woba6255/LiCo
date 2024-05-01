import { app, ipcMain } from "electron";
import { store } from "./store.ts";
import { CHANNELS } from "common/Channels.ts";

export class StartAppOnLogin {
    async onAppReady() {
        await this.syncStore();

        ipcMain.handle(CHANNELS.GET_START_ON_LOGIN, () => {
            return this.getStartOnLogin();
        });

        ipcMain.on(CHANNELS.SET_START_ON_LOGIN, (event, arg) => {
            this.setStartOnLogin(arg);
        });
    }

    async syncStore() {
        const startOnLoginElectron = app.getLoginItemSettings().openAtLogin;
        const startOnLoginStore = await this.getStartOnLogin();

        if (startOnLoginElectron !== startOnLoginStore) {
            this.setStartOnLogin(true);
        }
    }

    private setStartOnLogin(value: boolean) {
        store.startOnLogin.set(value);
        app.setLoginItemSettings({
            openAtLogin: value,
            enabled: value,
            args: ["--hidden"],
        });
    }

    private async getStartOnLogin() {
        return await store.startOnLogin.get();
    }
}

export const startAppOnLogin = new StartAppOnLogin();
