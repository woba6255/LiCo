import React from 'react'
import { distinctUntilChanged, map, Observable } from 'rxjs'
import { useEventHandler, useObservableValue } from 'shared/react'
import { EventNodeData, EventNodesData, EventNodeType } from '../types'
import { useNodeEditorStore } from './nodeEditorContext'

const nodesDataById$ = (
    nodesData$: Observable<EventNodesData>,
    id: string,
) => {
    return nodesData$.pipe(
        map(nodesData => nodesData[id]),
        distinctUntilChanged(),
    )
}

export function useNodeDataById<T extends EventNodeType>(nodeId: string) {
    const store = useNodeEditorStore()

    const nodeData = useObservableValue(
        React.useMemo(() => nodesDataById$(store.nodesData$, nodeId), [store.nodesData$, nodeId]),
    ) as EventNodeData<T> | undefined

    const setNodeData = useEventHandler((newNodeData: EventNodeData<T>) => {
        store.setNodeData(
            nodeId,
            newNodeData,
        )
    })

    return [
        nodeData,
        setNodeData,
    ] as const
}
