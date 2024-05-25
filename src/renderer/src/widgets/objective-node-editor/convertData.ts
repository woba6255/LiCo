import { Objective } from 'entities/objective'
import {
    createNewLink,
    createNewNode,
    EventLink,
    EventNode,
    EventNodesData,
    NodeEditorData,
} from 'features/node-editor'

export function convertToNodeEditorData(objective: Objective): NodeEditorData {
    const nodesData: EventNodesData = {}
    const links: EventLink[] = []
    const nodes: EventNode[] = objective.nodes.map((n) => {
        const [x, y] = n.position.split('/').map(Number)
        const [width, height] = n.size?.split('/').map(Number) || []

        if (!n.id) throw new Error('Node id is required')

        n.children.forEach((c) => {
            links.push(createNewLink({
                source: n.id!,
                target: c,
            }))
        })

        nodesData[n.id] = n.data

        return createNewNode({
            id: n.id,
            type: n.type,
            position: { x, y },
            width,
            height,
        })
    })

    return {
        nodes,
        links,
        nodesData,
    }
}

export function convertFromNodeEditorData({ nodes, links, nodesData }: NodeEditorData, objective: Objective): Objective {
    return {
        ...objective,
        nodes: nodes.map((n) => {
            const childrenIds: string[] = []

            links.forEach((l) => {
                if (l.source === n.id) childrenIds.push(l.target)
            })

            return {
                id: n.id,
                type: n.type!,
                links: [],
                position: `${n.position.x}/${n.position.y}`,
                children: childrenIds,
                size: `${n.width}/${n.height}`,
                data: nodesData[n.id!] as Objective['nodes'][0]['data'],
            }
        }),
    }
}
