import { backendApi } from "shared/backendApi";
import { uuid } from "shared/utils";
import { Workbench } from "entities/workbenches";
import { workbenchesStore$ } from "./workbenchesStore";


export const setWorkbench = async (workbench: Workbench) => {
    const currentState = workbenchesStore$.getValue();
    workbenchesStore$.next({
        ...currentState,
        allWorkbenches: {
            ...currentState.allWorkbenches,
            [workbench.id]: workbench,
        }
    });

    await backendApi.setWorkbench(workbench);
}

export const createWorkbench = async (name: string) => {
    const newWorkbench: Workbench = {
        id: uuid(),
        name,
        description: "",
        status: "idle",
        nodes: [],
        linkableItems: [],
        entryPoints: []
    }

    await setWorkbench(newWorkbench);

    return newWorkbench;
}

export const setNewWorkbenchName = (name: string) => {
    const currentState = workbenchesStore$.getValue();
    workbenchesStore$.next({
        ...currentState,
        newWorkbench: {
            name,
        }
    });
}

export const clearNewWorkbench = () => {
    const currentState = workbenchesStore$.getValue();
    workbenchesStore$.next({
        ...currentState,
        newWorkbench: undefined,
    });
}

export const createNewWorkbench = async () => {
    const currentState = workbenchesStore$.getValue();
    const newWorkbench = currentState.newWorkbench;

    if (newWorkbench) {
        const workbench = await createWorkbench(newWorkbench.name);
        clearNewWorkbench();
        return workbench;
    } else {
        throw new Error("Object not defined");
    }
}

export const deleteWorkbench = async (id: string) => {
    const currentState = workbenchesStore$.getValue();
    const allWorkbenches = { ...currentState.allWorkbenches };
    delete allWorkbenches[id];

    workbenchesStore$.next({
        ...currentState,
        allWorkbenches,
    });

    await backendApi.deleteWorkbench(id);
}
