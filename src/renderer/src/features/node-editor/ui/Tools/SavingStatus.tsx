import { Icons, Tpg, UI } from '../../../../shared/ui'
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

    switch (status) {
        case EditorSavingStatus.Waiting:
            content = 'nodeEditor.status.hasChanges'
            icon = <Icons.SaveOutlined />
            onCLick = onSave
            break
        case EditorSavingStatus.Saving:
            content = 'nodeEditor.status.saving'
            icon = <UI.Spinner size="sm" />
            break
        case EditorSavingStatus.Saved:
            content = 'nodeEditor.status.saved'
            icon = <Icons.CheckOutlined />
            break
        case EditorSavingStatus.Error:
            content = 'nodeEditor.status.error'
            icon = '❌'
            onCLick = onRetry
            break
        default:
            neverReached(status)
    }

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
