import React from 'react'
import { useEventHandler } from 'shared/react'
import { EditorSavingStatus } from '../types'

export function useSaveController<DATA>(
    data: DATA,
    onSave: (data: DATA) => Promise<void>,
    haveChanges: boolean,
) {
    const [status, setStatus] = React.useState(EditorSavingStatus.Saved)

    const save = useEventHandler((data: DATA) => {
        setStatus(EditorSavingStatus.Saving)

        onSave(data)
            .then(() => setStatus(EditorSavingStatus.Saved))
            .catch(() => setStatus(EditorSavingStatus.Error))
    })

    const forceSave = useEventHandler(() => {
        save(data)
    })

    React.useEffect(() => {
        let timer: ReturnType<typeof window.setTimeout> | null = null

        if (haveChanges) {
            setStatus(EditorSavingStatus.Waiting)
            timer = setTimeout(() => save(data), 1500)
        } else {
            setStatus(EditorSavingStatus.Saved)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [data, haveChanges, save])

    return { status, forceSave }
}
