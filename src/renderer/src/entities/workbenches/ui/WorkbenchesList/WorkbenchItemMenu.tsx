import { useNavigate, NavigateFunction } from "react-router";
import { Routes, detailedRoute } from "shared/routes";
import { Tpg, UI } from "shared/ui";
import { deleteWorkbench } from "../../model";
import { Workbench } from "../../types";

const menu = [{
    label: "common.edit",
    onClick: (workbench: Workbench, navigate: NavigateFunction) => navigate(
        detailedRoute(Routes.WORKBENCH_DETAIL, workbench.id)
    )
}, {
    label: "common.delete",
    onClick: (workbench: Workbench) => deleteWorkbench(workbench.id)
}]

type WorkbenchItemMenu = {
    workbench: Workbench;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

export function WorkbenchItemMenu({workbench, anchorEl, onClose}: WorkbenchItemMenu) {
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    return (
        <UI.Menu
            anchorEl={anchorEl}
            keepMounted
            open={isMenuOpen}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {
                menu.map(({label, onClick}) => (
                    <UI.MenuItem key={label} onClick={() => {
                        onClick(workbench, navigate);
                        onClose();
                    }}>
                        <Tpg text={label}/>
                    </UI.MenuItem>
                ))
            }
        </UI.Menu>
    );
}
