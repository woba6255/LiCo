import { useObservableEagerState } from "observable-hooks";
import { UI, Tpg } from "shared/ui";
import { isStartOnLoginEnabled$, toggleStartOnLogin } from "../model";

export function StartOnLoginSwitch() {
    const checked = useObservableEagerState(isStartOnLoginEnabled$);
    const handleSwitchClick = toggleStartOnLogin;

    return <UI.FormControlLabel
        control={
            <UI.Switch
                checked={checked}
                onClick={handleSwitchClick}
            />
        }
        label={<Tpg text="settings.autoStart"/>}
    />;
}
