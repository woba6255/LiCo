import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs'
import { createLocalObjective, LocalObjective, Objective } from 'entities/objective'

export type LocalObjectiveStoreApi = {
    isLocalObjectiveValid$: Observable<boolean>;
    localObjective$: Observable<Partial<Objective | LocalObjective> | undefined>;
    setLocalObjectiveParam<T extends keyof LocalObjective>(param: T, value: LocalObjective[T]): void;
    saveLocalObjective: () => void;
    localObjectiveParam$: <T extends keyof LocalObjective>(param$: Observable<T>) => Observable<(Objective | LocalObjective)[T]>;
};


type State = {
    objective: Objective | LocalObjective,
}

export function createLocalObjectiveStore(
    objective: Objective | null,
    onSave: (objective: Objective | LocalObjective) => void,
): LocalObjectiveStoreApi {
    let initialState: State

    if (objective) {
        initialState = {
            objective,
        }
    } else {
        initialState = {
            objective: createLocalObjective(),
        }
    }

    const store$ = new BehaviorSubject(initialState)

    return {
        isLocalObjectiveValid$: store$.pipe(
            map(state => !!state.objective.name),
            distinctUntilChanged(),
        ),
        localObjective$: store$.pipe(
            map(state => state.objective),
            distinctUntilChanged(),
        ),
        setLocalObjectiveParam: (param, value) => {
            const state = store$.getValue()

            store$.next({
                ...state,
                objective: {
                    ...state.objective,
                    [param]: value,
                },
            })
        },
        saveLocalObjective: () => {
            const state = store$.getValue()

            if (!state.objective) {
                throw new Error('Objective is not defined')
            }

            onSave(state.objective as Objective | LocalObjective)
        },
        localObjectiveParam$: (param$) => combineLatest([
            store$,
            param$,
        ]).pipe(
            map(([state, param]) => state.objective[param]),
            distinctUntilChanged(),
        ),
    }
}
