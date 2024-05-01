import React from "react";
import { NavigationTabs } from "features/navigationTabs";
import { Routes } from "shared/routes";
import { UI } from "shared/ui";

const tabs = [{
    path: Routes.HOME,
    key: "navigation.home",
}, {
    path: Routes.WORKBENCH,
    key: "navigation.workbench",
}];

type HeaderWidgetProps = {
    toolbar?: React.ReactNode;
}

function HeaderWidget({ toolbar }: HeaderWidgetProps) {
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
                {toolbar}
            </UI.Toolbar>
        </UI.AppBar>
    );
}

const memo = React.memo(HeaderWidget)
memo.displayName = HeaderWidget.name
export { memo as HeaderWidget }
