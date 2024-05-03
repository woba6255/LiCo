import { LocalWorkbench } from "../types";

export function createLocalWorkbench(): LocalWorkbench {
    return {
        id: undefined,
        name: "",
        description: "",
        status: "idle",
        nodes: [],
        linkableItems: [],
        entryPoints: []
    }
}
