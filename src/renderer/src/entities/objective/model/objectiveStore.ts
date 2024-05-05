import { BehaviorSubject } from "rxjs";
import { backendApi } from "shared/backendApi";
import { AllObjectivesMap } from "../types";

type State = {
    allObjectivesMap: AllObjectivesMap;
}

const initialState: State = {
    allObjectivesMap: await backendApi.getWorkbenches(),
};

export const objectiveStore$ = new BehaviorSubject(initialState);
