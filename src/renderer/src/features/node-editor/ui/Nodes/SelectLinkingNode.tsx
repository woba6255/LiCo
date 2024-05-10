import React from 'react'
import { UI } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { useEventHandler } from 'shared/react'
import { nodeOptions, nodeOptionsWithInnerSocket } from '../../config'
import { EventNodeType } from '../../types'

type Props = {
    onSelect: (type: EventNodeType) => void
    hasInnerSocket?: boolean
}

export function SelectLinkingNode({
    onSelect,
    hasInnerSocket,
}: Props) {
    const { t } = useTranslation()
    const options = hasInnerSocket ? nodeOptionsWithInnerSocket : nodeOptions

    const onAction = useEventHandler((type: React.Key) => onSelect(type as EventNodeType))

    return (
        <UI.Listbox
            aria-label={t('node_editor.selectNode.title')}
            onAction={onAction}
        >
            <UI.ListboxSection
                title={t('node_editor.selectNode.title')}
                classNames={{
                    group: 'flex flex-col gap-1',
                }}
            >

                {
                    options.map((nodeOption) => (
                        <UI.ListboxItem
                            key={nodeOption.type}
                            textValue={t(nodeOption.nameKey)}
                            variant="flat"
                            className="border"
                        >
                            {t(nodeOption.nameKey)}
                        </UI.ListboxItem>
                    ))
                }
            </UI.ListboxSection>
        </UI.Listbox>
    )
}
