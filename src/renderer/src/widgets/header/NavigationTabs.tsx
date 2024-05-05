import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { PossibleRoutes } from 'shared/routes'
import { UI } from 'shared/ui'
import { useTranslation } from 'shared/i18n'

type NavigationTabsProps = {
    tabs: {
        key: string;
        path: PossibleRoutes;
    }[];
}

const selectedPath = (pathname: string, paths: string[]) => {
    return paths
        .filter((route) => pathname.startsWith(route))
        .sort((a, b) => {
            const aSplit = a.split('/')
            const bSplit = b.split('/')
            if (aSplit.at(-1) === '') aSplit.pop()
            if (bSplit.at(-1) === '') bSplit.pop()
            return bSplit.length - aSplit.length
        })
        .at(0)
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
    const { t } = useTranslation()
    const { pathname } = useLocation()

    const selectedTab = selectedPath(
        pathname,
        tabs.map((route) => route.path)
    )

    return (
        <UI.Tabs
            selectedKey={selectedTab}
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
