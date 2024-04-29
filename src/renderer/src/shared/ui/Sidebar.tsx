import React from "react";
import { UI } from "./kit";

type SidebarProps = {
    children?: React.ReactNode;
    open: boolean;
    width?: number;
}

export function Sidebar({children, open, width}: SidebarProps) {
    return (
        <UI.Drawer
            open={open}
            variant="persistent"
            anchor="right"
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                },

            }}
        >
            {children}
        </UI.Drawer>
    )
}
