import { uuid } from 'shared/utils'
import { EventNode, EventNodeType } from '../types'


export function createNewNode(nodePartial?: Partial<EventNode>): EventNode {
    return {
        id: uuid(),
        data: undefined,
        type: EventNodeType.DATE,
        position: { x: 0, y: 0 },
        ...nodePartial,
    }
}
