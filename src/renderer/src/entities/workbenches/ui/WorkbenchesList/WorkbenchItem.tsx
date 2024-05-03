import React from "react";
import { NavLink } from "react-router-dom";
import { detailedRoute, Routes } from "shared/routes";
import { cn, Icons, UI } from "shared/ui";
import { Workbench } from "../../types";
import { WorkbenchItemMenu } from "./WorkbenchItemMenu";

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

    return (
        <UI.ListItem
            className={styles.item}
            key={workbench.id}
        >
            <NavLink
                className={styles.link}
                to={detailedRoute(Routes.WORKBENCH_NODE_EDITOR, workbench.id)}
            >
                {workbench.name}
            </NavLink>

            <UI.IconButton
                color="primary"
                className={cn(styles.moreButton, isMenuOpen && styles.moreButtonOpen)}
                onClick={handleMenu}
            >
                <Icons.MoreVert/>
            </UI.IconButton>
            <WorkbenchItemMenu
                workbench={workbench}
                anchorEl={anchorEl}
                onClose={handleClose}
            />
        </UI.ListItem>
    );
}

