export interface IEventNode<
    IS_CLIENT_VALUE extends boolean = false,
    T extends EventNodeType = EventNodeType
> {
    id: IS_CLIENT_VALUE extends true ? undefined : string;
    type: T
    data: EventNodeDataByType[T];
    name?: string;
    description?: string;
    releaseDate?: string;
    position: string;
    size: string | undefined;
    children: string[];
}

export enum EventNodeType {
    DATE = 'date',
    RELATIVE = 'relative',
    NOTIFICATION = 'notification'
}

export type EventNodeDataByType = {
    [EventNodeType.DATE]: Partial<IDateEventNodeData>;
    [EventNodeType.RELATIVE]: Partial<IRelativeEventNodeData>;
    [EventNodeType.NOTIFICATION]: Partial<INotificationEventNodeData>;
}

export interface IDateEventNodeData {
    dateFormula: string
    repeat: boolean;
}

export interface IRelativeEventNodeData {
    relativeFormula: string;
}

export interface INotificationEventNodeData {
    header: string;
    message: string;
    makeSound: boolean;
    showInFeed: boolean;
    predictInFeed: boolean;
    repeatBeforeConfirm: boolean;
    confirms: string[];
}


export interface IWorkbench<
    IS_CLIENT_VALUE extends boolean = false,
> {
    id: IS_CLIENT_VALUE extends true ? undefined : string;
    name: string;
    description: string;
    status: 'active' | 'complete' | 'failed' | 'canceled' | 'idle'
    nodes: IEventNode[]
}

export interface ITask {
    id: string
    workbenchId: string;
    nodeId: string;
    releaseTime: number;
}
