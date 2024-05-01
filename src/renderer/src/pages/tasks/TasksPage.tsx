import React from "react";
import { WorkbenchesBar } from "widgets/workbenchesBar";

type TasksPageProps = {
    children?: React.ReactNode;
}

function TasksPage({ children }: TasksPageProps) {
    return (
        <div className="flex flex-row h-full w-full">
            <WorkbenchesBar />
            {children}
        </div>
    )
}

const memo = React.memo(TasksPage)
memo.displayName = TasksPage.name
export { memo as TasksPage }
