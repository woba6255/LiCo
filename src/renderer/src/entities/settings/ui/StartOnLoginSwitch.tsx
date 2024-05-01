import { useObservableEagerState } from "observable-hooks";
import { Tpg } from "shared/typography";
import { UI } from "shared/ui";
import { isStartOnLoginEnabled$, toggleStartOnLogin } from "entities/settings";

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
