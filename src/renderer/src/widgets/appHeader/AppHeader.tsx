import React from "react";
import { AppBar, IconButton, Icons, Toolbar, Typography } from "shared/ui";
import { toggleAppSidebar } from "entities/app";


function AppHeader() {
    const handleMenuClick = toggleAppSidebar;

    return (
        <AppBar position="static">
            <Toolbar className="justify-between">
                <Typography variant="h6">
                    LiCo
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <Icons.Settings />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const memo = React.memo(AppHeader)
memo.displayName = AppHeader.name
export { memo as AppHeader }
