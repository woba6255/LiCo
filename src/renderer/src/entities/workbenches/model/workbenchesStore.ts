import { BehaviorSubject } from "rxjs";
import { backendApi } from "shared/backendApi";
import { AllWorkbenchesMap } from "../types";

type WorkbenchesState = {
    allWorkbenches: AllWorkbenchesMap;
}

const initialState: WorkbenchesState = {
    allWorkbenches: await backendApi.getWorkbenches(),
};

export const workbenchesStore$ = new BehaviorSubject(initialState);
