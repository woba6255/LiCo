import React from 'react'
import * as Flow from 'reactflow'
import { useEventHandler, useObservableValue } from 'shared/react'
import { createNewLink, createNewNode } from '../model'
import { useNodeEditorStore } from '../react'
import { EventLink, EventNode, EventNodeType, NodeEditorData } from '../types'
import { useConfirmOverPosition, useSaveController } from '../utils'
import { SelectLinkingNode, nodeTypes } from './Nodes'
import { EditorPopup, SavingStatus } from './Tools'

import 'reactflow/dist/style.css'
import styles from './NodeEditor.module.css'

const nodeOrigin: Flow.NodeOrigin = [0, 0.5]


type Props = {
    onSave: (data: NodeEditorData) => Promise<void>
    /**
     * Needs to prevent data loss.
     * Because calling save is not immediately.
     * TODO: move save status controlling to the parent component
     */
    onHasChangesChange: (hasChanges: boolean) => void
}

function NodeEditorSimple(props: Props) {
    const {
        onHasChangesChange,
    } = props
    const store = useNodeEditorStore()

    const nodes = useObservableValue(store.nodes$)
    const links = useObservableValue(store.links$)
    const data = useObservableValue(store.data$)
    const hasChanges = useObservableValue(store.hasChanges$)

    const { status, forceSave } = useSaveController<NodeEditorData>(
        data,
        props.onSave,
        hasChanges,
    )

    React.useEffect(() => {
        if (onHasChangesChange) onHasChangesChange(hasChanges)
    }, [onHasChangesChange, hasChanges])

    const connectionNodeIdRef = React.useRef<string | null>(null)
    const connectionNodeIdHandler = React.useRef<string | null>(null)
    const confirmOver = useConfirmOverPosition<EventNodeType>()

    const { screenToFlowPosition } = Flow.useReactFlow()

    /**
     * start dragging
     */
    const onConnectStart: Flow.OnConnectStart = useEventHandler((_, params) => {
        connectionNodeIdRef.current = params.nodeId
        connectionNodeIdHandler.current = params.handleId
    })

    /**
     * connect edge with link
     */
    const onConnect: Flow.OnConnect = useEventHandler((params) => {
        connectionNodeIdRef.current = null
        connectionNodeIdHandler.current = null

        if (!params.source || !params.target) throw new Error('Invalid connection')

        store.setLinks(Flow.addEdge(params, links) as EventLink[])
    })

    /**
     * stop dragging
     */
    const onConnectEnd = useEventHandler((event: React.MouseEvent) => {
        if (!connectionNodeIdRef.current) return
        const sourceId = connectionNodeIdRef.current
        const handleId = connectionNodeIdHandler.current

        const onConfirm = confirmOver.createOnConfirm({
            type: 'link',
            x: event.clientX,
            y: event.clientY,
        })

        /**
         * Show popover
         */
        onConfirm((type) => {
            const newNode = createNewNode({
                type,
                position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
            })

            const newLink = createNewLink({
                target: newNode.id,
                source: sourceId,
                sourceHandle: handleId,
            })

            store.addNode(newNode)
            store.addLink(newLink)
        })
    }) as unknown as Flow.OnConnectEnd

    const onContextMenu = useEventHandler((event: React.MouseEvent) => {
        event.preventDefault()
        const onConfirm = confirmOver.createOnConfirm({
            type: 'context-menu',
            x: event.clientX,
            y: event.clientY,
        })

        /**
         * Show popover
         */
        onConfirm((type) => {
            const newNode = createNewNode({
                type,
                position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
            })

            store.addNode(newNode)
        })
    })

    const onNodesChange: Flow.OnNodesChange = useEventHandler((change) => {
        store.setNodes(Flow.applyNodeChanges(change, nodes) as EventNode[])
    })

    const onEdgesChange: Flow.OnEdgesChange = useEventHandler((change) => {
        store.setLinks(Flow.applyEdgeChanges(change, links) as EventLink[])
    })

    return (
        <Flow.ReactFlow
            nodes={nodes}
            edges={links}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnectStart={onConnectStart}
            onConnect={onConnect}
            onConnectEnd={onConnectEnd}
            attributionPosition="bottom-left"
            className={styles.nodeEditor}
            fitView
            nodeOrigin={nodeOrigin}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
            onContextMenu={onContextMenu}
        >
            <Flow.Background
                variant={Flow.BackgroundVariant.Lines}
                color="#f2f8fc"
            />
            <Flow.Controls/>
            <SavingStatus
                status={status}
                onSave={forceSave}
                onRetry={forceSave}
            />
            <EditorPopup
                isShown={!!confirmOver.position}
                x={confirmOver.position?.x ?? 0}
                y={confirmOver.position?.y ?? 0}
                onClose={confirmOver.cancel}
            >
                <SelectLinkingNode
                    hasInnerSocket={confirmOver.position?.type === 'link'}
                    // send selected node type to the caller
                    onSelect={confirmOver.confirm}
                />
            </EditorPopup>
        </Flow.ReactFlow>
    )
}

export function NodeEditor(props: Props) {
    return (
        <Flow.ReactFlowProvider>
            <NodeEditorSimple {...props} />
        </Flow.ReactFlowProvider>
    )
}
