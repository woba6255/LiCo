import React from "react";
import { CreateWorkbenchButton, NewWorkbenchForm } from "entities/workbenches";
import { DividedLayout } from "shared/ui";

type CreateWorkbenchWidgetProps = {
    className?: string;
}

function CreateWorkbenchWidget({ className }: CreateWorkbenchWidgetProps) {
    return (
        <DividedLayout className={className}>
            <NewWorkbenchForm />
            <CreateWorkbenchButton />
        </DividedLayout>
    )
}

const memo = React.memo(CreateWorkbenchWidget)
memo.displayName = CreateWorkbenchWidget.name
export { memo as CreateWorkbenchWidget }
