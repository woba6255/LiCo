import React from "react";
import { Link } from 'react-router-dom'
import { PossibleRoutes } from "shared/routes";
import { Sidebar, UI, Icons, DividedLayout } from "shared/ui";
import { ObjectivesList } from './ObjectivesList'

function ObjectivesBar() {
    return (
        <Sidebar>
            <DividedLayout>
                <ObjectivesList />
                <UI.Button
                    isIconOnly
                    variant="light"
                    as={Link}
                    to={PossibleRoutes.OBJECTIVE_NEW}
                >
                    <Icons.PlusOutlined />
                </UI.Button>
            </DividedLayout>
        </Sidebar>
    )
}

const memo = React.memo(ObjectivesBar)
memo.displayName = ObjectivesBar.name
export { memo as ObjectivesBar }
