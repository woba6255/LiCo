import React from "react";
import { NavLink } from "react-router-dom";
import { detailedRoute, Routes } from "shared/routes";
import { Icons, UI, cn } from "shared/ui";
import { deleteWorkbench, Workbench } from "entities/workbenches";
import styles from "./WorkbenchItem.module.css";

type WorkbenchItemProps = {
    workbench: Workbench;
}

export function WorkbenchItem({ workbench }: WorkbenchItemProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteWorkbench(workbench.id);
    }

    return (
        <UI.ListItem
            className={styles.item}
            key={workbench.id}
        >
            <NavLink
                className={styles.link}
                to={detailedRoute(Routes.WORKBENCH_DETAIL, workbench.id)}
            >
                {workbench.name}
            </NavLink>

            <UI.IconButton
                color="primary"
                className={cn(styles.moreButton, isMenuOpen && styles.moreButtonOpen)}
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenu}
            >
                <Icons.MoreVert/>
            </UI.IconButton>
            <UI.Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={isMenuOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <UI.MenuItem onClick={handleDelete}>Delete</UI.MenuItem>
            </UI.Menu>
        </UI.ListItem>
    );
}
