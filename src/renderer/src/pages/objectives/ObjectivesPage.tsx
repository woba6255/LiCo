import React from "react";
import { ObjectivesBar } from "widgets/objectives-bar";

type TasksPageProps = {
    children?: React.ReactNode;
}

function ObjectivesPage({ children }: TasksPageProps) {
    return (
        <div className="grid grid-cols-[max-content,1fr] h-full w-full">
            <ObjectivesBar />
            {children}
        </div>
    )
}

const memo = React.memo(ObjectivesPage)
memo.displayName = ObjectivesPage.name
export { memo as ObjectivesPage }
