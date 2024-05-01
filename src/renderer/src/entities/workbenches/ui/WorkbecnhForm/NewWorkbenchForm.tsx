import { WorkbenchNameField } from "entities/workbenches";
import { UI } from "shared/ui";

export function NewWorkbenchForm() {
    return (
        <UI.Box p={2}>
            <WorkbenchNameField />
        </UI.Box>
    );
}
