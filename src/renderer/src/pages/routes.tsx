import { Outlet, RouteObject } from "react-router-dom";
import { reactLazyImport } from "shared/react";
import { Layout } from "shared/ui";
import { AppHeader } from "widgets/appHeader";
import { AppSidebar } from "widgets/appSidebar";
import { SettingsList } from "../widgets/settingsList/SettingsList.tsx";

const HomePageLazy = reactLazyImport(
    () => import("./home"),
    'HomePage'
)

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <Layout>
                <AppHeader />
                <AppSidebar>
                    <SettingsList />
                </AppSidebar>
                <Outlet />
            </Layout>

        ),
        children: [
            {
                index: true,
                element: <HomePageLazy />,
            },
        ],
    },
];
