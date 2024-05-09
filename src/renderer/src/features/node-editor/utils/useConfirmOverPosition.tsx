import React from 'react'
import { useEventHandler } from 'shared/react'

type Position = {
    type?: string,
    x: number,
    y: number,
}

export function useConfirmOverPosition<T>() {
    const [position, setPosition] = React.useState<Position | null>(null)
    const onConfirmRef = React.useRef<((nodeArgs: T) => void) | null>(null)

    const createOnConfirm = useEventHandler((innerPosition: Position) => {
        setPosition(innerPosition)
        return (onConfirm: (nodeArgs: T) => void) => {
            onConfirmRef.current = onConfirm
        }
    })

    const confirm = useEventHandler((value: T) => {
        if (!onConfirmRef.current) return
        onConfirmRef.current(value)
        setPosition(null)
    })

    const cancel = useEventHandler(() => {
        setPosition(null)
        onConfirmRef.current = null
    })

    return { position, confirm, createOnConfirm, cancel }
}
