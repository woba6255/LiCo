import { useObservableEagerState } from "observable-hooks";
import { UI } from "shared/ui";
import { allWorkbenches$, WorkbenchItem } from "entities/workbenches";

export function WorkbenchesList() {
    const workbenches = useObservableEagerState(allWorkbenches$);

    return (
        <UI.List>
            {workbenches.map((workbench) => (
                <WorkbenchItem
                    key={workbench.id}
                    workbench={workbench}
                />
            ))}
        </UI.List>
    );
}

