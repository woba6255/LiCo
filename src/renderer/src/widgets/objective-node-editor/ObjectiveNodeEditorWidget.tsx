import React from 'react'
import { useBlocker, useParams } from 'react-router'
import { useEventHandler } from 'shared/react'
import { useObjectiveById, setObjective } from 'entities/objective'
import { NodeEditor, EventNode, EventLink, createNewNode, createNewLink } from 'features/node-editor'

export function ObjectiveNodeEditorWidget() {
    const { id } = useParams<{ id: string }>()
    const [locked, setLocked] = React.useState(false)

    const objective = useObjectiveById(id)

    useBlocker(() => {
        if (locked) {
            return !window.confirm('You have unsaved changes. Are you sure you want to leave from editor?')
        }

        return false
    })

    if (!objective) throw new Error('Objective not found')

    const saveObjective = useEventHandler(async ({ links, nodes }: { links: EventLink[], nodes: EventNode[] }) => {
        console.log('Saving objective')

        await setObjective({
            ...objective,
            nodes: nodes.map((n) => {
                const childrenIds: string[] = [];

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
                }
            }),
        })
    })

    const { nodes, links } = React.useMemo(() => {
        const links: EventLink[] = []
        const nodes: EventNode[] = objective.nodes.map((n) => {
            const [x, y] = n.position.split('/').map(Number)
            const [width, height] = n.size?.split('/').map(Number) || []
            n.children.forEach((c) => {
                links.push(createNewLink({
                    source: n.id!,
                    target: c,
                }))
            })

            return createNewNode({
                id: n.id,
                type: n.type,
                position: { x, y },
                width,
                height,
            })
        })

        return { nodes, links }
    }, [objective])

    return (
        <NodeEditor
            key={id}
            onSave={saveObjective}
            links={links}
            nodes={nodes}
            onHasChangesChange={setLocked}
        />
    )
}
