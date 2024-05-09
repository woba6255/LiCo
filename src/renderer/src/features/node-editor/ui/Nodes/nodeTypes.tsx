import React from 'react'
import * as Flow from 'reactflow'
import { cn, Tpg } from 'shared/ui'
import { getNodeOptionsByType } from '../../config'
import { EventNodeType } from '../../types'

import styles from './Node.module.css'

export const nodeTypes: Flow.NodeTypes = {
    [EventNodeType.DATE]({ isConnectable }) {
        const options = getNodeOptionsByType(EventNodeType.DATE)

        return (
            <div>
                <div className={styles.nodeCard}>
                    <Tpg text={options.nameKey} />
                </div>
                <Flow.Handle
                    type="source"
                    className={cn(styles.socket, styles.source)}
                    position={Flow.Position.Right}
                    isConnectable={isConnectable}
                />
            </div>

        )
    },
    [EventNodeType.NOTIFICATION]({ isConnectable }) {
        const id = React.useId()
        const options = getNodeOptionsByType(EventNodeType.NOTIFICATION)

        return (
            <div>
                <Flow.Handle
                    type="target"
                    id={`target-${id}-1`}
                    className={cn(styles.socket, styles.target)}
                    position={Flow.Position.Left}
                    isConnectable={isConnectable}
                    isConnectableStart={false}
                />
                <div className={styles.nodeCard}>
                    <Tpg text={options.nameKey} />
                </div>
                <Flow.Handle
                    type="source"
                    id={`source-${id}-1`}
                    className={cn(styles.socket, styles.source)}
                    position={Flow.Position.Right}
                    isConnectable={isConnectable}
                />
            </div>

        )
    },
}
