import { SelectLocale } from 'features/select-locale'
import { StartOnLoginSwitch } from 'features/startup-options'

export function SettingsList() {
    return (
        <div
            className="flex flex-col gap-2 mx-2 my-2"
        >
            <SelectLocale/>
            <StartOnLoginSwitch />
        </div>
    )
}
