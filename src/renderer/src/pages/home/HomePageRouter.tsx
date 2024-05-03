import { reactLazyImport } from "shared/react";

const HomePageLazy = reactLazyImport(
    () => import("./HomePage"),
    'HomePage'
)

export const HomePageRouter = HomePageLazy;
