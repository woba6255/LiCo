import { SelectLocale, StartOnLoginSwitch } from "entities/settings";
import { UI } from "shared/ui";


export function SettingsList() {
    return (
        <UI.FormGroup
            className="mx-2 my-2"
        >
            <SelectLocale/>
            <StartOnLoginSwitch />
        </UI.FormGroup>
    )
}
