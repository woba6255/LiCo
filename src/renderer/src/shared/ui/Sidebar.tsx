import { Drawer } from "./kit";

type SidebarProps = {
    children?: React.ReactNode;
    open: boolean;
    width?: number;
}

export function Sidebar({children, open, width}: SidebarProps) {
    return (
        <Drawer
            open={open}
            variant="persistent"
            anchor="right"
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                },

            }}
        >
            {children}
        </Drawer>
    )
}
