import { RouteObject } from "react-router-dom";
import { reactLazyImport } from "shared/react";

const HomePageLazy = reactLazyImport(
    () => import("./home"),
    'HomePage'
)

export const routes: RouteObject[] = [
    {
        index: true,
        element: <HomePageLazy />,
    },
];
