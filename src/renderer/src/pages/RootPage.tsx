import React from "react";
import { HeaderWidget } from "widgets/header";
import { SidebarCogButton, SidebarWidget } from "widgets/sidebar";
import { SettingsList } from "features/settings";
import { Layout } from "shared/ui";

type RootPageProps = {
    children: React.ReactNode;
}

export function RootPage({ children }: RootPageProps) {
    return (
        <Layout>
            <HeaderWidget>
                <SidebarCogButton/>
            </HeaderWidget>
            <SidebarWidget>
                <SettingsList />
            </SidebarWidget>
            <Layout.Body>
                {children}
            </Layout.Body>
        </Layout>
    )
}
