import React from "react";
import { of } from 'rxjs'
import { useTranslation } from "shared/i18n";
import { useEventHandler, useObservableValue } from 'shared/react'
import { UI } from "shared/ui";
import { useObjectiveForm } from "../../react";

export function ObjectiveNameField() {
    const { t } = useTranslation();
    const { localObjectiveParam$, setLocalObjectiveParam } = useObjectiveForm();

    const name$ = React.useMemo(
        () => localObjectiveParam$(of('name')),
        [localObjectiveParam$]
    );

    const name = useObservableValue(name$);

    const handleChange = useEventHandler((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalObjectiveParam('name', e.target.value);
    });

    return (
        <UI.Input
            type="text"
            label={t("objective.field.name")}
            value={name ?? ""}
            onChange={handleChange}
        />
    );
}
