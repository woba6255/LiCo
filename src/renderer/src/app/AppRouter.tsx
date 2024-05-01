import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "pages/routes";

export const AppRouter = () => (
    <RouterProvider router={createHashRouter(routes)} />
)
