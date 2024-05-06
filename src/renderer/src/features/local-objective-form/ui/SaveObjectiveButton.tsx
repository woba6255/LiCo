import { useObservableValue } from 'shared/react'
import { Icons, UI, Tpg } from "shared/ui";
import { useObjectiveForm } from "../react";

export function SaveObjectiveButton() {
    const { isLocalObjectiveValid$, saveLocalObjective } = useObjectiveForm();
    const canSave = useObservableValue(isLocalObjectiveValid$);
    const handleClick = saveLocalObjective;

    return (
        <UI.Button
            color="success"
            variant="light"
            disabled={!canSave}
            onClick={handleClick}
            startContent={<Icons.SaveOutlined />}
        >
            <Tpg text="common.save" />
        </UI.Button>
    )
}
