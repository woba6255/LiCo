
export enum PossibleRoutes {
    DETAIL = ':id',
    NEW = 'new',
    HOME = "/",
    WORKBENCH = "/workbench",
    WORKBENCH_DETAIL = `${PossibleRoutes.WORKBENCH}/${PossibleRoutes.DETAIL}`,
    WORKBENCH_NEW = `${PossibleRoutes.WORKBENCH}/${PossibleRoutes.NEW}`,
    NODE_EDITOR = `/node-editor`,
    WORKBENCH_NODE_EDITOR = `${PossibleRoutes.WORKBENCH_DETAIL}/${PossibleRoutes.NODE_EDITOR}`,
}
