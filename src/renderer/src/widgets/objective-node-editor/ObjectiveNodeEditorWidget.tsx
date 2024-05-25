import React from 'react'
import { useBlocker, useParams } from 'react-router'
import { useEventHandler } from 'shared/react'
import { useObjectiveById, setObjective } from 'entities/objective'
import { NodeEditor, NodeEditorContextProvider, NodeEditorData } from 'features/node-editor'
import { convertFromNodeEditorData, convertToNodeEditorData } from './convertData'

export function ObjectiveNodeEditorWidget() {
    const { id: objectiveId } = useParams<{ id: string }>()

    // Block navigation while saving
    // TODO: extract to a hook
    const [locked, setLocked] = React.useState(false)
    const blocker = useBlocker(locked);
    React.useEffect(() => {
        if (!locked && blocker?.proceed) {
            blocker.proceed()
        }
    }, [locked, blocker])

    const objective = useObjectiveById(objectiveId)
    if (!objective) throw new Error('Objective not found')

    const saveObjective = useEventHandler(async (d: NodeEditorData) => {
        setLocked(true)
        await setObjective(
            convertFromNodeEditorData(d, objective)
        )
        setLocked(false)
    })

    const data = React.useMemo(
        () => convertToNodeEditorData(objective),
        [objective],
    )

    return (
        <NodeEditorContextProvider initialData={data}>
            <NodeEditor
                onSave={saveObjective}
                onHasChangesChange={setLocked}
            />
        </NodeEditorContextProvider>
    )
}
