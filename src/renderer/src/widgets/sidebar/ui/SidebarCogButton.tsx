import { Icons, UI } from "shared/ui";
import { toggleSidebar } from "../model";

export function SidebarCogButton() {
    const handleMenuClick = toggleSidebar

    return (
        <UI.IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
        >
            <Icons.Settings />
        </UI.IconButton>
    );
}
