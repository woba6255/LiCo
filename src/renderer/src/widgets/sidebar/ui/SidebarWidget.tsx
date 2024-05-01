import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { Icons, Sidebar, UI } from "shared/ui";
import { isSidebarOpened$, toggleSidebar } from "widgets/sidebar";
import { SettingsList } from "entities/settings";

function SidebarWidget() {
    const isOpen = useObservableEagerState(isSidebarOpened$)

    const handleMenuClick = toggleSidebar

    return (
        <Sidebar
            open={isOpen}
            width={300}
            variant="drawer"
        >
            <UI.Toolbar>
                <UI.IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <Icons.ChevronRight />
                </UI.IconButton>
            </UI.Toolbar>
            <UI.Divider />
            <SettingsList />
        </Sidebar>
    )
}

const memo = React.memo(SidebarWidget)
memo.displayName =  SidebarWidget.name
export { memo as  SidebarWidget }