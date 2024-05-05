import { Route } from 'react-router-dom'
import { PossibleRoutes } from 'shared/routes'
import { ObjectivesPageRouter } from 'pages/objectives'
import { HomePageRouter } from 'pages/home'

export const pagesRoutes = (
    <>
        <Route index element={<HomePageRouter />}/>
        <Route path={`${PossibleRoutes.OBJECTIVE}/*`} element={<ObjectivesPageRouter />}/>
    </>
)
