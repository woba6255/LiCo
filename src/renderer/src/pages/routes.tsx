import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { reactLazyImport } from "shared/react";
import { Routes } from "shared/routes";
import { RootPage } from "./root";

const HomePageLazy = reactLazyImport(
    () => import("./home"),
    'HomePage'
)

const TasksPageLazy = reactLazyImport(
    () => import("./tasks"),
    'TasksPage'
)

const WorkbenchEditorWidgetLazy = reactLazyImport(
    () => import("widgets/workbenchEditor"),
    'WorkbenchEditorWidget'
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
                        path: `${Routes.DETAIL}/${Routes.NODE_EDITOR}`,
                        element: 'NODE_EDITOR',
                    },
                    {
                        path: Routes.NEW,
                        element: <WorkbenchEditorWidgetLazy className="grow" />,
                    },
                    {
                        path: Routes.DETAIL,
                        element: <WorkbenchEditorWidgetLazy className="grow" />,
                    }
                ],
            },
        ],
    },
];
