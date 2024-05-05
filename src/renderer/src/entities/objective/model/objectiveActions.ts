import { backendApi } from 'shared/backendApi'
import { uuid } from "shared/utils";
import { LocalObjective, Objective } from "../types";
import { objectiveStore$ } from "./objectiveStore";


export const setObjective = async (objectiveToSet: Objective | LocalObjective) => {
    const currentState = objectiveStore$.getValue();

    let objective: Objective;

    if (objectiveToSet.id) {
        objective = objectiveToSet as Objective;
    } else {
        objective = {
            ...objectiveToSet,
            id: uuid(),
        }
    }

    await backendApi.setWorkbench(objective);

    objectiveStore$.next({
        ...currentState,
        allObjectivesMap: {
            ...currentState.allObjectivesMap,
            [objective.id]: objective,
        }
    });

    return objective;
}

export const deleteObjective = async (id: string) => {
    const currentState = objectiveStore$.getValue();
    const allObjectivesMap = { ...currentState.allObjectivesMap };
    delete allObjectivesMap[id];

    await backendApi.deleteWorkbench(id);

    objectiveStore$.next({
        ...currentState,
        allObjectivesMap,
    });
}
