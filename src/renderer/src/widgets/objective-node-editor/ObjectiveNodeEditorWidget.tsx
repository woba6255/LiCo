import React from 'react'
import { Navigate, useBlocker, useParams } from 'react-router'
import { useEventHandler } from 'shared/react'
import { useObjectiveById, setObjective } from 'entities/objective'
import { NodeEditor, NodeEditorContextProvider, NodeEditorData } from 'features/node-editor'
import { PossibleRoutes } from 'shared/routes'
import { convertFromNodeEditorData, convertToNodeEditorData } from './convertData'

export function ObjectiveNodeEditorWidget() {
    const { id: objectiveId } = useParams<{ id: string }>()
    const [locked, setLocked] = React.useState(false)

    const objective = useObjectiveById(objectiveId)

    if (!objective) throw new Error('Objective not found')

    const blocker = useBlocker(locked);

    const saveObjective = useEventHandler(async (d: NodeEditorData) => {
        setLocked(true)
        await setObjective(
            convertFromNodeEditorData(d, objective)
        )
        setLocked(false)
    })

    React.useEffect(() => {
        if (!locked && blocker?.proceed) {
            blocker.proceed()
        }
    }, [locked, blocker])


    const data = React.useMemo(
        () => convertToNodeEditorData(objective),
        [objective],
    )

    if (!objective && objectiveId) {
        return <Navigate to={PossibleRoutes.OBJECTIVE} replace />
    }

    return (
        <NodeEditorContextProvider initialData={data}>
            <NodeEditor
                onSave={saveObjective}
                onHasChangesChange={setLocked}
            />
        </NodeEditorContextProvider>
    )
}
