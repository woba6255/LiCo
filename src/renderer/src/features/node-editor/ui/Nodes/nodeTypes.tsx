import * as Flow from 'reactflow'
import { cn, Tpg, UI } from 'shared/ui'
import { useEventHandler } from 'shared/react'
import { getNodeOptionsByType } from '../../config'
import { useNodeDataById } from '../../react'
import { EventNodeData, EventNodeType } from '../../types'

import styles from './Node.module.css'

export const nodeTypes: Flow.NodeTypes = {
    [EventNodeType.DATE]({ isConnectable, id }) {
        const options = getNodeOptionsByType(EventNodeType.DATE)
        const [nodeData, setNodeData] = useNodeDataById<EventNodeType.DATE>(id)

        const setPartial = useEventHandler((partial: Partial<EventNodeData<EventNodeType.DATE>>) => {
            setNodeData({
                ...nodeData,
                ...partial
            })
        })


        return (
            <div>
                <Flow.Handle
                    type="source"
                    className={cn(styles.socket, styles.source)}
                    position={Flow.Position.Right}
                    isConnectable={isConnectable}
                />
                <div className={styles.nodeCard}>
                    <Tpg text={options.nameKey}/>
                    <UI.Input
                        label={<Tpg text="node_type.trigger.text_expression" />}
                        value={nodeData?.dateFormula}
                        onValueChange={dateFormula => setPartial({ dateFormula })}
                    />
                </div>
            </div>

        )
    },
    [EventNodeType.NOTIFICATION]({ isConnectable, id }) {
        const options = getNodeOptionsByType(EventNodeType.NOTIFICATION)
        const [nodeData, setNodeData] = useNodeDataById<EventNodeType.NOTIFICATION>(id)

        const setPartial = useEventHandler((partial: Partial<EventNodeData<EventNodeType.NOTIFICATION>>) => {
            setNodeData({
                ...nodeData,
                ...partial
            })
        })

        return (
            <div>
                <Flow.Handle
                    type="target"
                    className={cn(styles.socket, styles.target)}
                    position={Flow.Position.Left}
                    isConnectable={isConnectable}
                    isConnectableStart={false}
                />
                <div className={styles.nodeCard}>
                    <Tpg text={options.nameKey} />
                    <UI.Input
                        label={<Tpg text="common.header" />}
                        value={nodeData?.header}
                        onValueChange={header => setPartial({ header })}
                    />
                    <UI.Input
                        label={<Tpg text="common.message" />}
                        value={nodeData?.message}
                        onValueChange={message => setPartial({ message })}
                    />
                </div>
            </div>
        )
    },
    [EventNodeType.RELATIVE]({ isConnectable, id }) {
        const options = getNodeOptionsByType(EventNodeType.RELATIVE)
        const [nodeData, setNodeData] = useNodeDataById<EventNodeType.RELATIVE>(id)

        const setPartial = useEventHandler((partial: Partial<EventNodeData<EventNodeType.RELATIVE>>) => {
            setNodeData({
                ...nodeData,
                ...partial
            })
        })

        return (
            <div>
                <Flow.Handle
                    type="target"
                    className={cn(styles.socket, styles.target)}
                    position={Flow.Position.Left}
                    isConnectable={isConnectable}
                    isConnectableStart={false}
                />
                <Flow.Handle
                    type="source"
                    className={cn(styles.socket, styles.source)}
                    position={Flow.Position.Right}
                    isConnectable={isConnectable}
                />
                <div className={styles.nodeCard}>
                    <Tpg text={options.nameKey} />
                    <UI.Input
                        label={<Tpg text="node_type.relative.relative_expression" />}
                        value={nodeData?.relativeFormula}
                        onValueChange={relativeFormula => setPartial({ relativeFormula })}
                    />
                </div>
            </div>
        )
    }
}
