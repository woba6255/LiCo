import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { reactLazyImport } from 'shared/react'
import { PossibleRoutes } from 'shared/routes'
import { NotFound } from 'shared/ui'

const ObjectivesPageLazy = reactLazyImport(
    () => import('./ObjectivesPage'),
    'ObjectivesPage',
)
const ObjectiveFormWidget = reactLazyImport(
    () => import('widgets/objective-form'),
    'ObjectiveFormWidget',
)
const ObjectiveNodeEditorWidget = reactLazyImport(
    () => import('widgets/objective-node-editor'),
    'ObjectiveNodeEditorWidget',
)

export function ObjectivesPageRouter() {
    return (
        <Routes>
            <Route
                element={(
                    <ObjectivesPageLazy>
                        <React.Suspense fallback={null}>
                            <Outlet/>
                        </React.Suspense>
                    </ObjectivesPageLazy>
                )}
            >
                <Route
                    index
                    element="Page concept: У вас N активаных задач, из них N регулярных и N одноразовых, хотите завести новую задачу?"
                />
                <Route
                    path={`${PossibleRoutes.DETAIL}/${PossibleRoutes.NODE_EDITOR}`}
                    element={<ObjectiveNodeEditorWidget />}
                />
                <Route
                    path={PossibleRoutes.NEW}
                    element={<ObjectiveFormWidget />}
                />
                <Route
                    path={PossibleRoutes.DETAIL}
                    element={<ObjectiveFormWidget />}
                />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}
