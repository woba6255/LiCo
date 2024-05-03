import { useObservableEagerState } from "observable-hooks";
import { Icons, UI, Tpg } from "shared/ui";
import { useWorkbenchForm } from "../react";

export function SaveWorkbenchButton() {
    const { canSaveWorkbench$, saveWorkbench } = useWorkbenchForm();
    const canSave = useObservableEagerState(canSaveWorkbench$);
    const handleClick = saveWorkbench;

    return (
        <UI.Button
            disabled={!canSave}
            onClick={handleClick}
        >
            <Icons.Save fontSize="small" />
            <Tpg text="common.save" textTransform="none"/>
        </UI.Button>
    )
}
