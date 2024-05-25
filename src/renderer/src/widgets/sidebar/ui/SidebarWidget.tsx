import React from "react";
import { useObservableValue } from 'shared/react'
import { UI } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { isSidebarOpened$, toggleSidebar } from "../model";
import { SettingsList } from './SettingsList'

function SidebarWidget() {
    const { t } = useTranslation()
    const isOpen = useObservableValue(isSidebarOpened$)

    const handleMenuClick = toggleSidebar

    return (

        <UI.Modal isOpen={isOpen} onClose={handleMenuClick}>
            <UI.Modal.Content>
                <UI.Modal.Header className="px-3 py-2">
                    {t("settings.header")}
                </UI.Modal.Header>
                <UI.Modal.Body className="px-3 py-1">
                    <SettingsList />
                </UI.Modal.Body>
                <UI.Divider />
                <UI.Modal.Footer className="px-3 py-2">
                    <UI.Button variant="flat" onPress={toggleSidebar}>
                        {t("common.close")}
                    </UI.Button>
                </UI.Modal.Footer>
            </UI.Modal.Content>
        </UI.Modal>
    )
}

const memo = React.memo(SidebarWidget)
memo.displayName =  SidebarWidget.name
export { memo as  SidebarWidget }
