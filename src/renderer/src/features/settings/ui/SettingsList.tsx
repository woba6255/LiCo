import { UI } from "shared/ui";
import { SelectLocale } from "./SelectLocale.tsx";
import { StartOnLoginSwitch } from "./StartOnLoginSwitch.tsx";


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
