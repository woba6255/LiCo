import React from 'react'
import { PossibleRoutes } from 'shared/routes'
import { UI } from 'shared/ui'
import { NavigationTabs } from './NavigationTabs'

type HeaderWidgetProps = {
    tools: React.ReactNode;
}

const tabs = [{
    path: PossibleRoutes.HOME,
    key: 'navigation.home',
}, {
    path: PossibleRoutes.OBJECTIVE,
    key: 'navigation.workbench',
}]

function HeaderWidget({ tools }: HeaderWidgetProps) {
    return (
        <UI.Navbar isBordered>
            <UI.Navbar.Brand>
                LiCo
            </UI.Navbar.Brand>
            <UI.Navbar.Content justify="center">
                <NavigationTabs tabs={tabs}/>
            </UI.Navbar.Content>
            <UI.Navbar.Content justify="end">
                {tools}
            </UI.Navbar.Content>
        </UI.Navbar>
    )
}

const memo = React.memo(HeaderWidget)
memo.displayName = HeaderWidget.name
export { memo as HeaderWidget }
