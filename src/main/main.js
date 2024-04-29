import { app, Tray, Menu, nativeImage } from "electron";
import { mainWindow } from "./MainWindow.js";
import { startOnLogin } from "./StartOnLogin.js";
import { appStore } from "./store.ts";

let tray = null;

function createTray() {
    const icon = nativeImage.createFromPath(
        `${app.getAppPath()}/resources/icon.png`
    );
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: "Show", click: () => mainWindow.show() },
        { label: "Hide", click: () => mainWindow.hide() },
        { label: "Quit", click: () => app.quit() }
    ]);

    tray.setToolTip("LiCo App")
    tray.setTitle('LiCo App')
    tray.setContextMenu(contextMenu)

    tray.on("click", () => {
        mainWindow.show()
    });

    return tray;
}

await appStore.onAppInit()

app.whenReady().then(async () => {
    const isHidden = process.argv.includes("--hidden")
    await startOnLogin.onAppReady()
    createTray()
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
