import React from 'react'
import { useEventHandler } from 'shared/react'
import { EditorSavingStatus, EventLink, EventNode } from '../types'


export function useSaveController(
    onSave: (data: { nodes: EventNode[], links: EventLink[] }) => Promise<void>,
    nodes: EventNode[],
    links: EventLink[],
    haveChanges: boolean,
) {
    const [status, setStatus] = React.useState(EditorSavingStatus.Saved)

    const save = useEventHandler((ns: EventNode[], ls: EventLink[]) => {
        setStatus(EditorSavingStatus.Saving)

        onSave({ nodes: ns, links: ls })
            .then(() => setStatus(EditorSavingStatus.Saved))
            .catch(() => setStatus(EditorSavingStatus.Error))
    })

    const forceSave = useEventHandler(() => {
        save(nodes, links)
    })

    React.useEffect(() => {
        let timer: ReturnType<typeof window.setTimeout> | null = null

        if (haveChanges) {
            setStatus(EditorSavingStatus.Waiting)
            timer = setTimeout(() => save(nodes, links), 5000)
        } else {
            setStatus(EditorSavingStatus.Saved)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [haveChanges, links, nodes, save])

    return { status, forceSave }
}
