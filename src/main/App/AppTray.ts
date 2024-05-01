import { app, Menu, nativeImage, Tray } from "electron";

class AppTray {
    private _tray: Tray | null = null;
    private get tray() {
        if (!this._tray) throw new Error("Tray is not created");
        return this._tray;
    }
    private set tray(tray: Tray) {
        this._tray = tray;
    }

    createTray({ show, hide, quit }: { show: () => void, hide: () => void, quit: () => void }) {
        const icon = nativeImage.createFromPath(
            `${app.getAppPath()}/resources/icon.png`
        );
        this.tray = new Tray(icon)

        const contextMenu = Menu.buildFromTemplate([
            { label: "Show", click: show },
            { label: "Hide", click: hide },
            { label: "Quit", click: quit }
        ]);

        this.tray.setToolTip("LiCo App")
        this.tray.setTitle('LiCo App')
        this.tray.setContextMenu(contextMenu)

        this.tray.on("click", () => {
            show()
        });

        return this.tray;
    }
}

export const appTray = new AppTray();
