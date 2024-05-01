import { distinctUntilChanged, map } from "rxjs";
import { workbenchesStore$ } from "./workbenchesStore";


export const allWorkbenches$ = workbenchesStore$.pipe(
    map(state => state.allWorkbenches),
    distinctUntilChanged(),
    map(allWorkbenches => Object.values(allWorkbenches))
);

export const newWorkbenchName$ = workbenchesStore$.pipe(
    map(state => state.newWorkbench?.name),
    distinctUntilChanged(),
);

export const canSaveNewWorkbench$ = workbenchesStore$.pipe(
    map(state => !!state.newWorkbench?.name),
    distinctUntilChanged(),
);
