import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { Divider, IconButton, Icons, Sidebar, Toolbar } from "shared/ui";
import { isAppSidebarOpened$, toggleAppSidebar } from "entities/app";

type SidebarProps = {
    children?: React.ReactNode;
}

function AppSidebar({children}: SidebarProps) {
    const isOpen = useObservableEagerState(isAppSidebarOpened$)

    const handleMenuClick = toggleAppSidebar

    return (
        <Sidebar
            open={isOpen}
            width={300}
        >
            <Toolbar>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <Icons.ChevronRight />
                </IconButton>
            </Toolbar>
            <Divider />
            {children}
        </Sidebar>
    )
}

const memo = React.memo(AppSidebar)
memo.displayName = AppSidebar.name
export { memo as AppSidebar }
