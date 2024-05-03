import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { reactLazyImport } from 'shared/react'
import { PossibleRoutes } from 'shared/routes'
import { NotFound } from 'shared/ui'

const TasksPageLazy = reactLazyImport(
    () => import('./TasksPage'),
    'TasksPage',
)
const WorkbenchEditorWidgetLazy = reactLazyImport(
    () => import('widgets/workbenchEditor'),
    'WorkbenchEditorWidget',
)

export function TasksPageRouter() {
    return (
        <Routes>
            <Route
                element={(
                    <TasksPageLazy>
                        <React.Suspense fallback={null}>
                            <Outlet/>
                        </React.Suspense>
                    </TasksPageLazy>
                )}
            >
                <Route
                    index
                    element={404}
                />
                <Route
                    path={`${PossibleRoutes.DETAIL}/${PossibleRoutes.NODE_EDITOR}`}
                    element="NODE_EDITOR"
                />
                <Route
                    path={PossibleRoutes.NEW}
                    element={<WorkbenchEditorWidgetLazy className="grow"/>}
                />
                <Route
                    path={PossibleRoutes.DETAIL}
                    element={<WorkbenchEditorWidgetLazy className="grow"/>}
                />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}
