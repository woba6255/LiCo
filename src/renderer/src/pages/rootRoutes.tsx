import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import { PossibleRoutes } from 'shared/routes'
import { TasksPageRouter } from 'pages/tasks'
import { HomePageRouter } from 'pages/home'
import { NotFound } from 'shared/ui'
import { RootPage } from './RootPage.tsx'

export const rootRoutes = (
    <Route
        path={PossibleRoutes.HOME}
        element={(
            <RootPage>
                <React.Suspense fallback={null}>
                    <Outlet/>
                </React.Suspense>
            </RootPage>
        )}
    >
        <Route index element={<HomePageRouter />}/>
        <Route path={`${PossibleRoutes.WORKBENCH}/*`} element={<TasksPageRouter />}/>
        <Route path="*" element={<NotFound />}/>
    </Route>
)
