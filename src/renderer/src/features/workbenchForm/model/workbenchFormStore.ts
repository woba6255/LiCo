import {BehaviorSubject, distinctUntilChanged, map, Observable} from "rxjs";
import { createLocalWorkbench, LocalWorkbench, Workbench } from "entities/workbenches";

export type WorkbenchFormStoreApi = {
    canSaveWorkbench$: Observable<boolean>;
    editableWorkbench$: Observable<Partial<Workbench | LocalWorkbench> | undefined>;
    setWorkbench: (workbench: Partial<Workbench | LocalWorkbench>) => void;
    saveWorkbench: () => void;
};


type WorkbenchFormState = {
    workbench: Workbench | LocalWorkbench,
    id: string | null;
}

export function createWorkbenchFormStore(
    workbench: Workbench | null,
    onSave: (workbench: Workbench | LocalWorkbench) => void,
): WorkbenchFormStoreApi {
    let initialState: WorkbenchFormState;

    if (workbench) {
        initialState = {
            workbench,
            id: workbench.id,
        }
    } else {
        initialState = {
            workbench: createLocalWorkbench(),
            id: null,
        };
    }

    const store = new BehaviorSubject(initialState);

    return {
        canSaveWorkbench$: store.pipe(
            map(state => !!state.workbench.name),
            distinctUntilChanged(),
        ),
        editableWorkbench$: store.pipe(
            map(state => state.workbench),
            distinctUntilChanged(),
        ),
        setWorkbench: (workbench) => {
            const state = store.getValue();

            store.next({
                ...state,
                workbench: {
                    ...state.workbench,
                    ...workbench,
                },
            });
        },
        saveWorkbench: () => {
            const state = store.getValue();

            if (!state.workbench) {
                throw new Error("Workbench is not defined");
            }

            onSave(state.workbench as Workbench | LocalWorkbench);
        }
    }
}
