import React from "react";
import { LocalWorkbench, Workbench } from "entities/workbenches";
import { createWorkbenchFormStore, WorkbenchFormStoreApi } from "../model";

const context = React.createContext<WorkbenchFormStoreApi | null>(null);

type WorkbenchFormContextProps = {
    children: React.ReactNode;
    workbench: Workbench | null;
    onSave: (workbench: Workbench | LocalWorkbench) => void;
}

export const WorkbenchFormProvider: React.FC<WorkbenchFormContextProps> = ({
    children,
    workbench,
    onSave,
}) => {
    const store = React.useMemo(
        () => createWorkbenchFormStore(workbench, onSave),
        [onSave, workbench]
    );

    return (
        <context.Provider value={store}>
            {children}
        </context.Provider>
    );
}

export const useWorkbenchForm = () => {
    const store = React.useContext(context);
    if (!store) {
        throw new Error("useWorkbenchForm must be used within a WorkbenchFormProvider");
    }
    return store;
}
