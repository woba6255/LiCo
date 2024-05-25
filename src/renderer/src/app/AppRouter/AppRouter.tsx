import { createHashRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { rootRoutes } from './rootRoutes'

export const AppRouter = () => (
    <RouterProvider router={createHashRouter(createRoutesFromElements(rootRoutes))} />
)
