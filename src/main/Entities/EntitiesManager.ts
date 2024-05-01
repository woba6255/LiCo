import { CHANNELS } from "common/Channels";
import { EventNodeType, IEventNode, ILinkableItem, IWorkbench, LinkableItemType } from "common/Entities";
import { ipcMain } from "electron";
import { InterfaceToType, store } from "../App/store";

class EntitiesManager {
    public onAppReady() {
        ipcMain.handle(CHANNELS.GET_WORKBENCHES, () => {
            return this.getWorkbenches();
        });

        ipcMain.handle(CHANNELS.SET_WORKBENCH, (_, workbench) => {
            return this.setWorkbench(workbench);
        });

        ipcMain.handle(CHANNELS.DELETE_WORKBENCH, (_, id) => {
            return this.deleteWorkbench(id);
        });
    }

    // public async onAppInit() {
    //     const state = await this.getWorkbenches();
    //     const workbenches = Workbench.factoryFromObject(state);
    // }

    private getWorkbenches() {
        return store.workbenches.get();
    }

    private setWorkbench(workbench: IWorkbench) {
        return store.workbenches[workbench.id].set(workbench as InterfaceToType<IWorkbench>);
    }

    private deleteWorkbench(id: string) {
        return store.workbenches[id].delete();
    }
}

export const entitiesManager = new EntitiesManager();


class Workbench implements IWorkbench {
    static factoryFromObject(object: Record<string, IWorkbench>): Workbench[] {
        const values = Object.values(object);

        return values.map((value) => new Workbench(value));
    }

    id: string;
    name: string;
    description: string;
    status: "active" | "complete" | "failed" | "canceled" | "idle";
    nodes: EventNode[];
    linkableItems: LinkableItem[];
    entryPoints: string[];

    constructor(properties: IWorkbench) {
        this.id = properties.id;
        this.name = properties.name;
        this.description = properties.description;
        this.status = properties.status;
        this.entryPoints = properties.entryPoints;
        this.nodes = properties.nodes.map((node) => new EventNode(node));
        this.linkableItems = properties.linkableItems.map((item) => new LinkableItem(item));
    }
}

class EventNode implements IEventNode {
    id: string;
    type: EventNodeType;
    name: string;
    description: string;
    releaseDate: string;
    position: string;
    children: string[];
    links: string[];

    constructor(properties: IEventNode) {
        this.id = properties.id;
        this.type = properties.type;
        this.name = properties.name;
        this.description = properties.description;
        this.releaseDate = properties.releaseDate;
        this.position = properties.position;
        this.children = properties.children;
        this.links = properties.links;
    }
}

class LinkableItem implements ILinkableItem {
    id: string;
    type: LinkableItemType;

    constructor(properties: ILinkableItem) {
        this.id = properties.id;
        this.type = properties.type;
    }
}
