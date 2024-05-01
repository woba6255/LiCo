import React from "react";

type Props = {
    children: React.ReactNode;
};

export function Layout({ children }: Props) {
    return (
        <div className="flex flex-col h-full w-full">
            {children}
        </div>
    )
}

Layout.Body = function LayoutBody({ children }: Props) {
    return (
        <div className="flex overflow-auto h-full w-full">
            {children}
        </div>
    )
}
