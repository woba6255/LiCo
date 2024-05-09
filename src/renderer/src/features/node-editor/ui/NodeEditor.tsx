import React from 'react'
import * as Flow from 'reactflow'
import { useConstant, useEventHandler, useObservableValue } from 'shared/react'
import { createNewLink, createNewNode, createNodeEditorStore } from '../model'
import { EventLink, EventNode, EventNodeType } from '../types'
import { useConfirmOverPosition, useSaveController } from '../utils'
import { SelectLinkingNode, nodeTypes } from './Nodes'
import { EditorPopup, SavingStatus } from './Tools'

import 'reactflow/dist/style.css'
import styles from './NodeEditor.module.css'

const nodeOrigin: Flow.NodeOrigin = [0, 0.5]

type Props = {
    nodes: EventNode[]
    links: EventLink[]
    onSave: (data: { nodes: EventNode[], links: EventLink[] }) => Promise<void>
    onHasChangesChange: (hasChanges: boolean) => void
}

function NodeEditorSimple(props: Props) {
    const {
        onHasChangesChange,
    } = props

    const store = useConstant(
        () => createNodeEditorStore({
            initialNodes: props.nodes,
            initialLinks: props.links,
        }),
        [props.nodes, props.links],
    )

    const nodes = useObservableValue(store.nodes$)
    const links = useObservableValue(store.links$)
    const hasChanges = useObservableValue(store.hasChanges$)

    const { status, forceSave } = useSaveController(
        props.onSave,
        nodes,
        links,
        hasChanges,
    )

    React.useEffect(() => {
        if (onHasChangesChange) onHasChangesChange(hasChanges)
    }, [onHasChangesChange, hasChanges])

    const connectionNodeIdRef = React.useRef<string | null>(null)
    const connectionNodeIdHandler = React.useRef<string | null>(null)
    const confirmOver = useConfirmOverPosition<EventNodeType>()

    const { screenToFlowPosition } = Flow.useReactFlow()

    const onConnectStart: Flow.OnConnectStart = useEventHandler((_, params) => {
        connectionNodeIdRef.current = params.nodeId
        connectionNodeIdHandler.current = params.handleId
    })

    const onConnect: Flow.OnConnect = useEventHandler((params) => {
        connectionNodeIdRef.current = null
        connectionNodeIdHandler.current = null

        if (!params.source || !params.target) throw new Error('Invalid connection')

        store.setLinks(Flow.addEdge(params, links) as EventLink[])
    })

    const onConnectEnd = useEventHandler((event: React.MouseEvent) => {
        if (!connectionNodeIdRef.current) return
        const sourceId = connectionNodeIdRef.current
        const handleId = connectionNodeIdHandler.current

        const onConfirm = confirmOver.createOnConfirm({
            type: 'link',
            x: event.clientX,
            y: event.clientY,
        })

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
            fitViewOptions={{ padding: 5 }}
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
