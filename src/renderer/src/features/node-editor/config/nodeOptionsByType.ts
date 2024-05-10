import { EventNodeType } from '../types'

type NodeTypeOptions<T extends EventNodeType> = {
    type: T
    hasInnerSocket: boolean
    nameKey: string
}

type Declaration = {
    [T in EventNodeType]: NodeTypeOptions<T>
}

export const nodeOptionsByType: Declaration = {
    [EventNodeType.DATE]: {
        type: EventNodeType.DATE,
        hasInnerSocket: false,
        nameKey: 'node_type.trigger.name',
    },
    [EventNodeType.NOTIFICATION]: {
        type: EventNodeType.NOTIFICATION,
        hasInnerSocket: true,
        nameKey: 'node_type.notification.name',
    },
    [EventNodeType.RELATIVE]: {
        type: EventNodeType.RELATIVE,
        hasInnerSocket: true,
        nameKey: 'nodeType.relative.name',
    },
}

export const nodeOptions = Object.values(nodeOptionsByType)

export const nodeOptionsWithInnerSocket = Object.values(nodeOptionsByType)
    .filter((options) => options.hasInnerSocket)

export function getNodeOptionsByType<T extends EventNodeType>(type: T) {
    return nodeOptionsByType[type]
}
