import * as Flow from 'reactflow'
import { EventNodeType as CommonNodeType, EventNodeDataByType } from 'common/Entities'

export { CommonNodeType as EventNodeType }
export type EventNode = Flow.Node<undefined, CommonNodeType>
export type EventLink = Flow.Edge
export type EventNodeData<T extends CommonNodeType = CommonNodeType> = EventNodeDataByType[T]
export type EventNodesData = Record<string, EventNodeData>

export type NodeEditorData = {
    links: EventLink[]
    nodes: EventNode[]
    nodesData: EventNodesData
}
