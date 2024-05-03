import React from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes } from "shared/routes";
import { Sidebar, UI, Icons, DividedLayout } from "shared/ui";
import { WorkbenchesList } from "entities/workbenches";

function WorkbenchesBarWidget() {
    return (
        <Sidebar open>
            <DividedLayout>
                <WorkbenchesList />
                <UI.IconButton
                    component={Link}
                    to={PossibleRoutes.WORKBENCH_NEW}
                >
                    <Icons.Add />
                </UI.IconButton>
            </DividedLayout>
        </Sidebar>
    )
}

const memo = React.memo(WorkbenchesBarWidget)
memo.displayName = WorkbenchesBarWidget.name
export { memo as WorkbenchesBar }
