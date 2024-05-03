import React from "react";
import { useNavigate, useParams } from "react-router";
import { useObservable, useObservableEagerState } from "observable-hooks";
import { useEventHandler } from "shared/react";
import { DividedLayout, Tpg, UI, toaster } from "shared/ui";
import { getWorkbenchById$, LocalWorkbench, setWorkbench, Workbench } from "entities/workbenches";
import { SaveWorkbenchButton, WorkbenchForm, WorkbenchFormProvider } from "features/workbenchForm";
import { detailedRoute, PossibleRoutes } from "shared/routes";
import { of } from "rxjs";

type CreateWorkbenchWidgetProps = {
    className?: string;
}

function WorkbenchEditorWidget({ className }: CreateWorkbenchWidgetProps) {
    const navigate = useNavigate();
    const { id: workbenchId } = useParams();

    const workbench$ = useObservable(() => {
        if (workbenchId) {
            return getWorkbenchById$(of(workbenchId))
        }
        return of(null)
    }, [workbenchId])

    const workbench = useObservableEagerState(workbench$)

    const onSave = useEventHandler(async (workbench: Workbench | LocalWorkbench) => {
        try {
            const { id } = await setWorkbench(workbench)
            navigate(detailedRoute(PossibleRoutes.WORKBENCH_NODE_EDITOR, id))
            toaster.info("common.saved");
        } catch (error) {
            if (error instanceof Error) {
                toaster.error(error.message);
            } else {
                throw error
            }
        }
    })

    return (
        <WorkbenchFormProvider
            workbench={workbench}
            onSave={onSave}
        >
            <DividedLayout className={className}>
                <UI.Box p={2} gap={2} display="flex" flexDirection="column">
                    <Tpg
                        variant="h6"
                        text={workbenchId ? "workbench.form.edit" : "workbench.form.create"}
                    />
                    <WorkbenchForm/>
                </UI.Box>
                <SaveWorkbenchButton/>
            </DividedLayout>
        </WorkbenchFormProvider>
    )
}

const memo = React.memo(WorkbenchEditorWidget)
memo.displayName = WorkbenchEditorWidget.name
export { memo as WorkbenchEditorWidget }
