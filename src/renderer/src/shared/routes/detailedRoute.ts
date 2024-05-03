import { PossibleRoutes } from "shared/routes";

export function detailedRoute(route: PossibleRoutes, id: string) {
    return route.replace(PossibleRoutes.DETAIL, id);
}
