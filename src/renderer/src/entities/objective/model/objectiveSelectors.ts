import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs'
import { objectiveStore$ } from "./objectiveStore.ts";

export const allObjectives$ = objectiveStore$.pipe(
    map(state => state.allObjectivesMap),
    distinctUntilChanged(),
    map(allWorkbenches => Object.values(allWorkbenches))
);

export const getObjectiveById$ = (id$: Observable<string>) => combineLatest([
    objectiveStore$,
    id$
]).pipe(
    map(([state, id]) => {
        return state.allObjectivesMap[id]
    }),
    distinctUntilChanged()
);
