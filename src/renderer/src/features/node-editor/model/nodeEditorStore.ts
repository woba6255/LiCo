import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs'
import { shallowEqual } from 'shared/utils'
import { EventLink, EventNode, NodeEditorData } from '../types'

export type NodeEditorStoreApi = {
    nodes$: Observable<NodeEditorData['nodes']>
    links$: Observable<NodeEditorData['links']>
    nodesData$: Observable<NodeEditorData['nodesData']>
    data$: Observable<NodeEditorData>
    hasChanges$: Observable<boolean>
    addNode: (nodes: EventNode) => void
    addLink: (links: EventLink) => void
    setNodes: (nodes: EventNode[]) => void
    setLinks: (links: EventLink[]) => void
    setNodeData: (id: string, data: NodeEditorData['nodesData'][string]) => void
}

export function createNodeEditorStore(initialData: NodeEditorData): NodeEditorStoreApi {
    const nodes$ = new BehaviorSubject<NodeEditorData['nodes']>(initialData.nodes)
    const links$ = new BehaviorSubject<NodeEditorData['links']>(initialData.links)
    const nodesData$ = new BehaviorSubject<NodeEditorData['nodesData']>(initialData.nodesData)
    const combined$ = combineLatest([nodes$, links$, nodesData$])

    return {
        nodes$: nodes$.asObservable(),
        links$: links$.asObservable(),
        nodesData$: nodesData$.asObservable(),
        data$: combined$.pipe(
            map(([nodes, links, nodesData]) => ({ nodes, links, nodesData })),
        ),
        hasChanges$: combined$.pipe(
            map(([nodes, links, nodesData]) => {
                const nodesEqual = nodes.every((node, index) => shallowEqual(node, initialData.nodes[index]))
                const linksEqual = links.every((link, index) => shallowEqual(link, initialData.links[index]))
                const nodesDataEqual = Object.keys(nodesData).every(key => shallowEqual(nodesData[key], initialData.nodesData[key]))

                return !nodesEqual || !linksEqual || !nodesDataEqual
            }),
        ),
        addNode: (node) => {
            const state = nodes$.getValue()
            nodes$.next([...state, node])
        },
        addLink: (link) => {
            const state = links$.getValue()
            links$.next([...state, link])
        },
        setLinks: (links) => {
            links$.next(links)
        },
        setNodes: (nodes) => {
            nodes$.next(nodes)
        },
        setNodeData: (id, data) => {
            const state = nodesData$.getValue()
            nodesData$.next({ ...state, [id]: data })
        }
    }
}
