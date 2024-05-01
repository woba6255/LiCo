import { BehaviorSubject } from "rxjs";
import { AllWorkbenchesMap } from "entities/workbenches";
import { backendApi } from "shared/backendApi";

type WorkbenchesState = {
    allWorkbenches: AllWorkbenchesMap;
    newWorkbench?: {
        name: string;
    }
}

const initialState: WorkbenchesState = {
    allWorkbenches: await backendApi.getWorkbenches(),
    newWorkbench: undefined,
};

export const workbenchesStore$ = new BehaviorSubject(initialState);
