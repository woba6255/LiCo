import React from "react";
import { useNavigate } from "react-router";
import { useObservableEagerState } from "observable-hooks";
import { useEventHandler } from "shared/react";
import { detailedRoute, Routes } from "shared/routes";
import { Icons, UI, Tpg } from "shared/ui";
import { canSaveNewWorkbench$, createNewWorkbench } from "entities/workbenches";

export function CreateWorkbenchButton() {
    const [err, setErr] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const canSave = useObservableEagerState(canSaveNewWorkbench$);

    const handleClick = useEventHandler(async () => {
        try {
            const { id } = await createNewWorkbench();
            navigate(detailedRoute(Routes.WORKBENCH_DETAIL, id));
        } catch (error) {
            if (error instanceof Error) {
                setErr(error.message);
            } else {
                setErr("Unknown error");
            }
        }
    });

    const handleCloseSnackbar = useEventHandler(() => {
        setErr(null);
    });

    return (
        <>
            <UI.Snackbar
                open={!!err}
                onClose={handleCloseSnackbar}
                autoHideDuration={1200}
            >
                <UI.Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {err}
                </UI.Alert>
            </UI.Snackbar>
            <UI.Button
                disabled={!canSave}
                onClick={handleClick}
            >
                <Icons.Save fontSize="small" />
                <Tpg text="common.save" textTransform="none"/>
            </UI.Button>
        </>
    )
}
