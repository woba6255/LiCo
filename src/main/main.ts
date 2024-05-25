import { app } from "electron";
import { entitiesManager } from "./Entities/EntitiesManager";
import { appTray } from "./App/AppTray";
import { mainWindow } from "./App/MainWindow";
import { startAppOnLogin } from "./App/StartAppOnLogin";
import { appStore } from "./App/store";

import "common/temporal"

await appStore.onAppInit()

app.whenReady().then(async () => {
    const isHidden = process.argv.includes("--hidden")
    await startAppOnLogin.onAppReady()
    entitiesManager.onAppReady()
    appTray.createTray({
        show: () => mainWindow.show(),
        hide: () => mainWindow.hide(),
        quit: () => app.quit(),
    })
    await mainWindow.create(!isHidden)
});

app.on("activate", () => {
    if (!mainWindow.hasWindow) {
        mainWindow.create()
    }
});

app.on("before-quit", () => {
    mainWindow.prepareToQuit()
});

app.on("window-all-closed", () => {
    app.quit()
});
