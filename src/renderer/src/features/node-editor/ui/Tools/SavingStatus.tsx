import React from 'react'
import { Icons, Tpg, UI } from 'shared/ui'
import { EditorSavingStatus } from '../../types'

type Props = {
    status: EditorSavingStatus
    onSave: () => void
    onRetry: () => void
}

function neverReached(x: never): never {
    throw new Error(`Never reached: ${x}`)
}

export function SavingStatus({
    status,
    onSave,
    onRetry,
}: Props) {
    let content = null
    let icon = null
    let onCLick = undefined

    const onTimeoutRef = React.useRef<(() => void) | null>(null)
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const [delayedStatus, setDelayed] = React.useState(status)

    switch (delayedStatus) {
        case EditorSavingStatus.Waiting:
            content = 'node_editor.status.hasChanges'
            icon = <Icons.SaveOutlined />
            onCLick = onSave
            break
        case EditorSavingStatus.Saving:
            content = 'node_editor.status.saving'
            icon = <UI.Spinner size="sm" />
            break
        case EditorSavingStatus.Saved:
            content = 'node_editor.status.saved'
            icon = <Icons.CheckOutlined />
            break
        case EditorSavingStatus.Error:
            content = 'node_editor.status.error'
            icon = '❌'
            onCLick = onRetry
            break
        default:
            neverReached(delayedStatus)
    }

    React.useEffect(() => {
        if (status !== EditorSavingStatus.Saved) {
            if (timer.current) {
                clearTimeout(timer.current)
                timer.current = null
            }

            setDelayed(status)
        }

        onTimeoutRef.current = () => {
            setDelayed(status)
        }

        if (!timer.current) {
            timer.current = setTimeout(() => {
                timer.current = null
                if (onTimeoutRef.current) {
                    onTimeoutRef.current()
                }
            }, 500)
        }
    }, [content, icon, onCLick, status])

    React.useEffect(() => () => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null
        }
    }, [])

    return (
        <div className="absolute bottom-0 right-0 z-[5]">
            <UI.Tooltip
                delay={250}
                closeDelay={100}
                placement="left"
                content={<Tpg text={content}/>}
            >
                <UI.Button
                    variant="light"
                    isIconOnly
                    onClick={onCLick}
                >
                    {icon}
                </UI.Button>
            </UI.Tooltip>
        </div>
    )
}
