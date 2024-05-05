import { useObservableValue } from 'shared/react'
import { UI, Tpg } from "shared/ui";
import { isStartOnLoginEnabled$, toggleStartOnLogin } from "../model";

export function StartOnLoginSwitch() {
    const checked = useObservableValue(isStartOnLoginEnabled$);
    const handleSwitchClick = toggleStartOnLogin;

    return (
        <UI.Switch
            checked={checked}
            onClick={handleSwitchClick}
        >
            <Tpg text="settings.autoStart"/>
        </UI.Switch>
    )
}
