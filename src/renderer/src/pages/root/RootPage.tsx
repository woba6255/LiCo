import React from "react";
import { Layout } from "shared/ui";
import { HeaderWidget } from "widgets/header";
import { SidebarWidget, SidebarCogButton } from "widgets/sidebar";

type RootPageProps = {
    children: React.ReactNode;
}

export function RootPage({ children }: RootPageProps) {
    return (
        <Layout>
            <HeaderWidget
                toolbar={
                    <SidebarCogButton/>
                }
            />
            <SidebarWidget/>
            <Layout.Body>
                {children}
            </Layout.Body>
        </Layout>
    )
}
