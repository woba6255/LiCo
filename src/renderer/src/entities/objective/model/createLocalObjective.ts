import { LocalObjective } from "../types";

export function createLocalObjective(): LocalObjective {
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
