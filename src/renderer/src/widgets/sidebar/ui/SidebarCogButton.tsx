import React from "react";
import { Icons, UI } from "shared/ui";
import { toggleSidebar } from "widgets/sidebar";

export function SidebarCogButton() {
    const handleMenuClick = toggleSidebar

    return (
        <UI.IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
        >
            <Icons.Settings />
        </UI.IconButton>
    );
}
