import { createHashRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { rootRoutes } from "pages/rootRoutes.tsx";

export const AppRouter = () => (
    <RouterProvider router={createHashRouter(createRoutesFromElements(rootRoutes))} />
)
