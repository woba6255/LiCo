import React from "react";
import { cn, UI } from "shared/ui";

type Props = {
    children: React.ReactNode;
    className?: string;
}

export function DividedLayout({ children, className }: Props) {
    const childes = React.Children.toArray(children)

    if (childes.length !== 2) {
        throw new Error("Divided component should have exactly 2 children")
    }

    return (
        <div className={cn("h-full flex flex-col", className)}>
            <div className="grow overflow-y-auto">
                {childes[0]}
            </div>
            <UI.Divider />
            <div className="flex justify-center items-center h-10">
                {childes[1]}
            </div>
        </div>
    )
}
