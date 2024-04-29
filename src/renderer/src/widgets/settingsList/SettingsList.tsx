import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { Tpg } from "shared/typography";
import { UI } from "shared/ui";
import { isStartOnLoginEnabled$, toggleStartOnLogin } from "entities/settings";
import { SelectLocale } from "features/selectLocale";


function SettingsList() {
    const isStartOnLoginEnabled = useObservableEagerState(isStartOnLoginEnabled$);
    const handleSwitchClick = toggleStartOnLogin;

    return (
        <UI.FormGroup
            className="mx-2 my-2"
        >
            <SelectLocale />
            <UI.FormControlLabel
                control={
                    <UI.Switch
                        checked={isStartOnLoginEnabled}
                        onClick={handleSwitchClick}
                    />
                }
                label={<Tpg text="settings.autoStart" />}
            />
        </UI.FormGroup>
    )
}

const memo = React.memo(SettingsList)
memo.displayName = SettingsList.name
export { memo as SettingsList }
