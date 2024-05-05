
export enum PossibleRoutes {
    DETAIL = ':id',
    NEW = 'new',
    HOME = "/",
    NODE_EDITOR = `/node-editor`,
    OBJECTIVE = "/objective",
    OBJECTIVE_DETAIL = `${PossibleRoutes.OBJECTIVE}/${PossibleRoutes.DETAIL}`,
    OBJECTIVE_NEW = `${PossibleRoutes.OBJECTIVE}/${PossibleRoutes.NEW}`,
    OBJECTIVE_NODE_EDITOR = `${PossibleRoutes.OBJECTIVE_DETAIL}/${PossibleRoutes.NODE_EDITOR}`,
}
