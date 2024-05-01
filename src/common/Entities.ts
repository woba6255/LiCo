export interface ILinkableItem<IS_CLIENT_VALUE extends boolean = false> {
    id: IS_CLIENT_VALUE extends true ? undefined : string;
    type: LinkableItemType;
}

export interface INotificationConfirm<
    IS_CLIENT_VALUE extends boolean = false,
    IS_NORMALIZED extends boolean = true
> extends ILinkableItem<IS_CLIENT_VALUE> {
    label: string;
    isDefault: boolean;
    type: LinkableItemType.CONFIRM;
    childrens: IS_NORMALIZED extends true ? string[] : IEventNode[];
}

export interface IEventNode<
    IS_CLIENT_VALUE extends boolean = false,
    IS_NORMALIZED extends boolean = true
> {
    id: IS_CLIENT_VALUE extends true ? undefined : string;
    type: EventNodeType
    name: string;
    description: string;
    releaseDate: string;
    position: string;
    children: IS_NORMALIZED extends true ? string[] : IEventNode[];
    links: IS_NORMALIZED extends true ? string[] : ILinkableItem[];
}

export enum EventNodeType {
    DATE = 'date',
    RELATIVE = 'relative',
    NOTIFICATION = 'notification'
}

export enum LinkableItemType {
    CONFIRM = 'confirm',
}

export interface IDateEventNode extends IEventNode {
    type: EventNodeType.DATE;
    dateFormula: string
    repeat: boolean;
}

export interface IRelativeEventNode extends IEventNode {
    type: EventNodeType.RELATIVE;
    relativeFormula: string;
}

export interface INotificationEventNode<
    IS_CLIENT_VALUE extends boolean = false,
    IS_NORMALIZED extends boolean = true
> extends IEventNode<IS_CLIENT_VALUE, IS_NORMALIZED> {
    type: EventNodeType.NOTIFICATION;
    header: string;
    message: string;
    makeSound: boolean;
    showInFeed: boolean;
    predictInFeed: boolean;
    repeatBeforeConfirm: boolean;
    confirms: IS_NORMALIZED extends true ? string[] : INotificationConfirm[];
}


export interface IWorkbench<
    IS_CLIENT_VALUE extends boolean = false,
    IS_NORMALIZED extends boolean = true
> {
    id: IS_CLIENT_VALUE extends true ? undefined : string;
    name: string;
    description: string;
    status: 'active' | 'complete' | 'failed' | 'canceled' | 'idle'
    nodes: IEventNode<boolean, IS_NORMALIZED>[];
    linkableItems: ILinkableItem[];
    entryPoints: IS_NORMALIZED extends true ? string[] : IEventNode[];
}

export interface ITask {
    id: string
    workbenchId: string;
    nodeId: string;
    releaseDate: string;
    repeatTimes: number;
}
