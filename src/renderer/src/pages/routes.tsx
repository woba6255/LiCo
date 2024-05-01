import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { reactLazyImport } from "shared/react";
import { Routes } from "shared/routes";
import { RootPage } from "pages/root";

const HomePageLazy = reactLazyImport(
    () => import("./home"),
    'HomePage'
)

const TasksPageLazy = reactLazyImport(
    () => import("./tasks"),
    'TasksPage'
)

const CreateWorkbenchWidgetLazy = reactLazyImport(
    () => import("widgets/workbenchEditor"),
    'CreateWorkbenchWidget'
)

export const routes: RouteObject[] = [
    {
        path: Routes.HOME,
        element: (
            <RootPage>
                <React.Suspense fallback={null}>
                    <Outlet />
                </React.Suspense>
            </RootPage>
        ),
        children: [
            {
                index: true,
                element: <HomePageLazy/>,
            },
            {
                path: Routes.WORKBENCH,
                element: (
                    <TasksPageLazy>
                        <React.Suspense fallback={null}>
                            <Outlet />
                        </React.Suspense>
                    </TasksPageLazy>
                ),
                children: [
                    {
                        index: true,
                        element: 404,
                    },
                    {
                        path: Routes.NEW,
                        element: <CreateWorkbenchWidgetLazy className="grow" />,
                    },
                    {
                        path: Routes.DETAIL,
                        element: 'DETAIL',
                    }
                ],
            },
        ],
    },
];
