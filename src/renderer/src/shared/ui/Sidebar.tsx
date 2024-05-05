import React from "react";

type SidebarProps = {
    children?: React.ReactNode;
    isOpen: boolean;
}

export function Sidebar({
    children,
    isOpen,
}: SidebarProps) {
    const transitionClasses = 'transition duration-300 ease-in-out';

    let relativeContainerClasses = 'h-full';
    if (isOpen) {
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
