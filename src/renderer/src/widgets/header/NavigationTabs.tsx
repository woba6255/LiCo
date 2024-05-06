import { Link } from 'react-router-dom'
import { PossibleRoutes } from 'shared/routes'
import { UI } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { useSelectedPath } from 'shared/react'

type NavigationTabsProps = {
    tabs: {
        key: string;
        path: PossibleRoutes;
    }[];
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
    const { t } = useTranslation()

    const selectedPath = useSelectedPath(
        tabs.map((route) => route.path)
    )

    return (
        <UI.Tabs
            selectedKey={selectedPath}
            aria-label="Tabs"
        >
            {
                tabs.map((route) => (
                    <UI.Tab
                        id={route.path}
                        title={t(route.key)}
                        key={route.path}
                        as={Link}
                        // @ts-ignore
                        to={route.path}
                    />
                ))
            }
        </UI.Tabs>
    )
}
