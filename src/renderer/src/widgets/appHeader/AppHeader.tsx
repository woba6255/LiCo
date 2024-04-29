import React from "react";
import { Icons, UI } from "shared/ui";
import { toggleAppSidebar } from "entities/app";


function AppHeader() {
    const handleMenuClick = toggleAppSidebar;

    return (
        <UI.AppBar
            position="static"
            color="primary"
        >
            <UI.Toolbar className="justify-between">
                <UI.Typography variant="h6">
                    LiCo
                </UI.Typography>
                <UI.IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <Icons.Settings />
                </UI.IconButton>
            </UI.Toolbar>
        </UI.AppBar>
    );
}

const memo = React.memo(AppHeader)
memo.displayName = AppHeader.name
export { memo as AppHeader }
