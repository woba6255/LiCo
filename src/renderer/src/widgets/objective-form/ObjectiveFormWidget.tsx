import React from "react";
import { Navigate, useNavigate, useParams } from 'react-router'
import { useEventHandler } from "shared/react";
import { DividedLayout, Tpg, toaster } from "shared/ui";
import { detailedRoute, PossibleRoutes } from "shared/routes";
import { Objective, setObjective, useObjectiveById, LocalObjective } from 'entities/objective'
import { ObjectiveForm, ObjectiveFormProvider, SaveObjectiveButton } from 'features/objective-form'

type Props = {
    className?: string;
}

function ObjectiveFormWidget({ className }: Props) {
    const navigate = useNavigate();
    const { id: objectiveId } = useParams();

    const objective = useObjectiveById(objectiveId);

    const onSave = useEventHandler(async (objectiveToSave: Objective | LocalObjective) => {
        try {
            const { id } = await setObjective(objectiveToSave)
            navigate(detailedRoute(PossibleRoutes.OBJECTIVE_NODE_EDITOR, id))
            toaster.info("common.saved");
        } catch (error) {
            if (error instanceof Error) {
                toaster.error(error.message);
            } else {
                throw error
            }
        }
    })

    if (!objective && objectiveId) {
        return <Navigate to={PossibleRoutes.OBJECTIVE} replace />
    }

    return (
        <ObjectiveFormProvider
            objective={objective}
            onSave={onSave}
        >
            <DividedLayout className={className}>
                <div className="flex flex-col w-full gap-2 p-2">
                    <h3 className="text-xl font-bold">
                        <Tpg
                            text={objectiveId ? "objective.form.edit" : "objective.form.create"}
                        />
                    </h3>
                    <ObjectiveForm/>
                </div>
                <SaveObjectiveButton/>
            </DividedLayout>
        </ObjectiveFormProvider>
    )
}

const memo = React.memo(ObjectiveFormWidget)
memo.displayName = ObjectiveFormWidget.name
export { memo as ObjectiveFormWidget }
