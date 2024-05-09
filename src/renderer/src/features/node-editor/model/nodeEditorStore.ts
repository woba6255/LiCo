import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs'
import { shallowEqual } from 'shared/utils'
import { EventLink, EventNode } from '../types'

type Store = {
    nodes$: Observable<EventNode[]>
    links$: Observable<EventLink[]>
    hasChanges$: Observable<boolean>
    addNode: (nodes: EventNode) => void
    addLink: (links: EventLink) => void
    setNodes: (nodes: EventNode[]) => void
    setLinks: (links: EventLink[]) => void
}

type Args = {
    initialNodes: EventNode[]
    initialLinks: EventLink[]
}

export function createNodeEditorStore({ initialNodes, initialLinks }: Args): Store {
    const nodes$ = new BehaviorSubject<EventNode[]>(initialNodes)
    const links$ = new BehaviorSubject<EventLink[]>(initialLinks)

    return {
        nodes$: nodes$.asObservable(),
        links$: links$.asObservable(),
        hasChanges$: combineLatest([nodes$, links$])
        .pipe(
            map(([nodes, links]) => {
                const nodesEqual = nodes.every((node, index) => shallowEqual(node, initialNodes[index]))
                const linksEqual = links.every((link, index) => shallowEqual(link, initialLinks[index]))

                return !nodesEqual || !linksEqual
            })
        ),
        addNode: (node: EventNode) => {
            const state = nodes$.getValue()
            nodes$.next([...state, node])
        },
        addLink: (link: EventLink) => {
            const state = links$.getValue()
            links$.next([...state, link])
        },
        setLinks: (links: EventLink[]) => {
            links$.next(links)
        },
        setNodes: (nodes: EventNode[]) => {
            nodes$.next(nodes)
        },
    }
}
