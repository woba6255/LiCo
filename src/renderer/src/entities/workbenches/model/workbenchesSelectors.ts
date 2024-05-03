import { distinctUntilChanged, map, Observable, zip } from "rxjs";
import { workbenchesStore$ } from "./workbenchesStore";

export const allWorkbenches$ = workbenchesStore$.pipe(
    map(state => state.allWorkbenches),
    distinctUntilChanged(),
    map(allWorkbenches => Object.values(allWorkbenches))
);

export const getWorkbenchById$ = (idObservable: Observable<string>) => zip(
    workbenchesStore$,
    idObservable
).pipe(
    map(([state, id]) => state.allWorkbenches[id]),
    distinctUntilChanged()
);
