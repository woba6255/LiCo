import React from "react";
import { Objective, LocalObjective } from 'entities/objective'
import { LocalObjectiveStoreApi, createLocalObjectiveStore } from '../model'

const context = React.createContext<LocalObjectiveStoreApi | null>(null);

type Props = {
    children: React.ReactNode;
    objective: Objective | null;
    onSave: (objective: Objective | LocalObjective) => void;
}

export function ObjectiveFormProvider({
    children,
    objective,
    onSave,
}: Props) {
    const store = React.useMemo(
        () => createLocalObjectiveStore(objective, onSave),
        [onSave, objective]
    );

    return (
        <context.Provider value={store}>
            {children}
        </context.Provider>
    );
}

export function useObjectiveForm() {
    const store = React.useContext(context);
    if (!store) {
        throw new Error(`${useObjectiveForm.name} must be used within a ${ObjectiveFormProvider.name} component`)
    }
    return store;
}
