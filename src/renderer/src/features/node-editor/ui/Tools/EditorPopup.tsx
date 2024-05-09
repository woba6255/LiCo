import React from 'react'
import { UI } from '../../../../shared/ui'

type Props = {
    isShown: boolean,
    y: number,
    x: number,
    onClose: () => void,
    children?: React.ReactNode,
}

export function EditorPopup({
    isShown,
    y,
    x,
    onClose,
    children,
}: Props) {
    return <UI.Popover
        isOpen={isShown}
        onClose={onClose}
    >
        <UI.PopoverTrigger>
            <div
                style={{
                    position: 'fixed',
                    top: y,
                    left: x,
                    display: isShown ? 'block' : 'none',
                }}/>
        </UI.PopoverTrigger>
        <UI.PopoverContent>
            {children}
        </UI.PopoverContent>
    </UI.Popover>
}
