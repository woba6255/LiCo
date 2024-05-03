import React from "react";
import { PossibleRoutes } from "shared/routes";
import { UI } from "shared/ui";
import { NavigationTabs } from "./NavigationTabs";

type HeaderWidgetProps = {
    children?: React.ReactNode;
}

const tabs = [{
    path: PossibleRoutes.HOME,
    key: "navigation.home",
}, {
    path: PossibleRoutes.WORKBENCH,
    key: "navigation.workbench",
}];

function HeaderWidget({ children }: HeaderWidgetProps) {
    return (
        <UI.AppBar
            position="static"
            color="primary"
        >
            <UI.Toolbar className="justify-between">
                <UI.Typography variant="h6">
                    LiCo
                </UI.Typography>
                <NavigationTabs tabs={tabs} />
                {children}
            </UI.Toolbar>
        </UI.AppBar>
    );
}

const memo = React.memo(HeaderWidget)
memo.displayName = HeaderWidget.name
export { memo as HeaderWidget }
