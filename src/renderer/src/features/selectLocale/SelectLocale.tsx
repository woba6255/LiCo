import { Icons, UI } from "shared/ui";
import { useEventHandler } from "shared/react";
import { localesOptions, changeLocale, useTranslation } from "shared/i18n";

export function SelectLocale() {
    const { i18n } = useTranslation();
    const handleLocaleChange = useEventHandler((event: UI.SelectChangeEvent<string>) => {
        changeLocale(event.target.value);
    });

    return (
        <UI.Select
            IconComponent={Icons.Language}
            value={i18n.language}
            onChange={handleLocaleChange}
        >
            {
                localesOptions.map(({ value, label }) => (
                    <UI.MenuItem key={value} value={value}>
                        {label}
                    </UI.MenuItem>
                ))
            }
        </UI.Select>
    )
}
