import { app } from "electron";
import { appTray } from "./AppTray.ts";
import { mainWindow } from "./MainWindow.js";
import { startOnLogin } from "./StartOnLogin.js";
import { appStore } from "./store.ts";

await appStore.onAppInit()

app.whenReady().then(async () => {
    const isHidden = process.argv.includes("--hidden")
    await startOnLogin.onAppReady()
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
