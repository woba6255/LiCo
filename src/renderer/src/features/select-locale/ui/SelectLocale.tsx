import { UI } from 'shared/ui'
import { localesOptions, changeLocale, useTranslation } from 'shared/i18n'


export function SelectLocale() {
    const { i18n, t } = useTranslation()

    return (
        <UI.Select.Root
            label={t('settings.appLanguage')}
            selectedKeys={[i18n.language]}
        >
            {
                localesOptions.map(({ value, label }) => (
                    <UI.Select.Item
                        onClick={() => changeLocale(value)}
                        key={value}
                        value={value}
                    >
                        {label}
                    </UI.Select.Item>
                ))
            }
        </UI.Select.Root>
    )
}
