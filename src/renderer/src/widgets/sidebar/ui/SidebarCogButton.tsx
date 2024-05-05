import { Icons, UI } from "shared/ui";
import { toggleSidebar } from "../model";

export function SidebarCogButton() {
    const handleMenuClick = toggleSidebar

    return (
        <UI.Button
            isIconOnly
            aria-label="menu"
            variant="light"
            onClick={handleMenuClick}
        >
            <Icons.SettingOutlined />
        </UI.Button>
    );
}
