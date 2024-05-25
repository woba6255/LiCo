import { createHashRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { rootRoutes } from './rootRoutes'

export const AppRouter = () => (
    /**
     * Used hash router to make it work with electron.
     *  Because electron runs the app from the file (file://),
     */
    <RouterProvider router={createHashRouter(createRoutesFromElements(rootRoutes))} />
)
