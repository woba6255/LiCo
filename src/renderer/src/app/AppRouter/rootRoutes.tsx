import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import { pagesRoutes } from 'pages/pagesRoutes.tsx'
import { AppLayout } from '../AppLayout.tsx'

export const rootRoutes = (
    <Route
        path="/"
        element={(
            <AppLayout>
                <React.Suspense fallback={null}>
                    <Outlet />
                </React.Suspense>
            </AppLayout>
        )}
    >
        {pagesRoutes}
    </Route>
)
