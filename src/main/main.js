import { app, BrowserWindow } from "electron";
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';


let mainWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
        show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
            preload: join(app.getAppPath(), 'out', 'preload', 'preload.mjs'),
        }
    });


    mainWindow.on('ready-to-show', () => {
        mainWindow?.show();

        if (import.meta.env.DEV) {
            mainWindow?.webContents.openDevTools();
        }
    });

    console.log(import.meta.env);

    if (import.meta.env.DEV) {
        await mainWindow.loadURL('http://localhost:5173');
    } else {
        await mainWindow.loadFile(
            fileURLToPath(new URL('./../renderer/index.html', import.meta.url)),
        );
    }
    mainWindow.on("closed", () => mainWindow = null);
}
app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow == null) {
        createWindow();
    }
});
