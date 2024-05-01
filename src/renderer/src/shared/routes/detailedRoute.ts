import { Routes } from "shared/routes";

export function detailedRoute(route: Routes, id: string) {
    return route.replace(Routes.DETAIL, id);
}
