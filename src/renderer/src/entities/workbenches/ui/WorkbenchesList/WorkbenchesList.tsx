import { useObservableEagerState } from "observable-hooks";
import { UI } from "shared/ui";
import { allWorkbenches$ } from "../../model";
import { WorkbenchItem } from "./WorkbenchItem.tsx";

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

