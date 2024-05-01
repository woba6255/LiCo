import React from "react";
import { UI } from "./kit";

type SidebarProps = {
    children?: React.ReactNode;
    open: boolean;
    width?: number;
    variant?: "drawer" | "normal";
}

export function Sidebar({
    children,
    open,
    width,
    variant
}: SidebarProps) {
    if (variant === "drawer") {
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

    const transitionClasses = 'transition duration-300 ease-in-out';

    let relativeContainerClasses = 'h-full';
    if (open) {
        relativeContainerClasses += ' w-64';
    } else {
        relativeContainerClasses += ' w-12';
    }

    let absoluteContainerClasses = `w-64 h-full bg-white border-r border-gray-200 shadow-sm ${transitionClasses}`;
    if (!open) {
        absoluteContainerClasses += ' transform -translate-x-52';
    }

    return (
        <div style={{zIndex: 5}} className={relativeContainerClasses}>
            <div className={absoluteContainerClasses}>
                {children}
            </div>
        </div>
    );
}
