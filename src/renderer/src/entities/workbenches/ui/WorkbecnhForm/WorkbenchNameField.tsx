import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { useTranslation } from "shared/i18n";
import { useEventHandler } from "shared/react";
import { UI } from "shared/ui";
import { newWorkbenchName$, setNewWorkbenchName } from "entities/workbenches";

export function WorkbenchNameField() {
    const { t } = useTranslation();
    const name = useObservableEagerState(newWorkbenchName$);
    const handleChange = useEventHandler((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewWorkbenchName(e.target.value ?? "");
    });

    return (
        <UI.TextField
            label={t("workbench.field.name")}
            value={name ?? ""}
            onChange={handleChange}
        />
    );
}
