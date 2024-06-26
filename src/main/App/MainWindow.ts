import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow } from "electron";

export class MainWindow {
    private _browserWindow: BrowserWindow | null = null;
    private allowClose = false;

    private get browserWindow() {
        if (this._browserWindow === null) {
            throw new Error('Browser window is not created, check _browserWindow property');
        }

        return this._browserWindow;
    }

    private set browserWindow(value: BrowserWindow) {
        this._browserWindow = value;
    }

    async create(showWhenReady = true) {
        const mainWindow = new BrowserWindow({
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
                webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
                preload: join(app.getAppPath(), 'out', 'preload', 'preload.mjs'),
            }
        });

        mainWindow.on('ready-to-show', () => {
            if (showWhenReady) {
                mainWindow.show();
            }

            if (import.meta.env.DEV) {
                mainWindow?.webContents.openDevTools();
            }
        });

        mainWindow.on("close", (event) => {
            if (!this.allowClose) {
                event.preventDefault();
                this.browserWindow.hide();
            }
        });

        if (import.meta.env.DEV) {
            await mainWindow.loadURL('http://localhost:5173');
        } else {
            await mainWindow.loadFile(
                fileURLToPath(new URL('./../renderer/index.html', import.meta.url)),
            );
        }

        this.browserWindow = mainWindow;

        return mainWindow;
    }

    prepareToQuit() {
        this.allowClose = true;
    }

    hide() {
        this.browserWindow.hide();
    }

    show() {
        this.browserWindow.show();
    }

    get hasWindow() {
        return this._browserWindow !== null;
    }
}

export const mainWindow = new MainWindow();
