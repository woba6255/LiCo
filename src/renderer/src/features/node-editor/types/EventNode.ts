import * as Flow from 'reactflow'
import { EventNodeType as CommonNodeType } from 'common/Entities'

export { CommonNodeType as EventNodeType }
export type EventNode = Flow.Node<undefined, CommonNodeType>
export type EventLink = Flow.Edge
