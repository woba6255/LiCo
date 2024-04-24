import { app, Tray, Menu, nativeImage } from "electron";
import { mainWindow } from "./MainWindow.js";

let tray = null;

function createTray() {
    const icon = nativeImage.createFromPath("resources/icon.png")
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

app.whenReady().then(() => {
    createTray()
    mainWindow.create()
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
