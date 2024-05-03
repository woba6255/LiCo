import React from "react";
import { distinctUntilChanged, map } from "rxjs";
import { useObservableEagerState } from "observable-hooks";
import { useTranslation } from "shared/i18n";
import { useEventHandler } from "shared/react";
import { UI } from "shared/ui";
import { useWorkbenchForm } from "../../react";

export function WorkbenchNameField() {
    const { t } = useTranslation();
    const { editableWorkbench$, setWorkbench } = useWorkbenchForm();

    const name$ = React.useMemo(() => editableWorkbench$.pipe(
        map(workbench => workbench?.name),
        distinctUntilChanged(),
    ), [editableWorkbench$]);

    const name = useObservableEagerState(name$);

    const handleChange = useEventHandler((e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkbench({
            name: e.target.value,
        })
    });

    return (
        <UI.TextField
            label={t("workbench.field.name")}
            value={name ?? ""}
            onChange={handleChange}
        />
    );
}
