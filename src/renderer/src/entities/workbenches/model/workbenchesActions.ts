import { backendApi } from "shared/backendApi";
import { uuid } from "shared/utils";
import { LocalWorkbench, Workbench } from "../types";
import { workbenchesStore$ } from "./workbenchesStore";


export const setWorkbench = async (workbenchArg: Workbench | LocalWorkbench) => {
    const currentState = workbenchesStore$.getValue();

    let workbench: Workbench;

    if (workbenchArg.id) {
        workbench = workbenchArg as Workbench;
    } else {
        workbench = {
            ...workbenchArg,
            id: uuid(),
        }
    }

    workbenchesStore$.next({
        ...currentState,
        allWorkbenches: {
            ...currentState.allWorkbenches,
            [workbench.id]: workbench,
        }
    });

    await backendApi.setWorkbench(workbench);
    return workbench;
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
