
export enum Routes {
    DETAIL = ':id',
    NEW = 'new',
    HOME = "/",
    WORKBENCH = "/workbench",
    WORKBENCH_DETAIL = `${Routes.WORKBENCH}/${Routes.DETAIL}`,
    WORKBENCH_NEW = `${Routes.WORKBENCH}/${Routes.NEW}`,
    NODE_EDITOR = `/node-editor`,
    WORKBENCH_NODE_EDITOR = `${Routes.WORKBENCH_DETAIL}/${Routes.NODE_EDITOR}`,
}
