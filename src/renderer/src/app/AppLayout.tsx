import React from 'react'
import { Layout } from 'shared/ui'
import { HeaderWidget } from 'widgets/header'
import { SidebarCogButton, SidebarWidget } from 'widgets/sidebar'

type AppLayoutProps = {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <Layout>
            <HeaderWidget
                tools={<SidebarCogButton/>}
            />
            <SidebarWidget/>
            <Layout.Body>
                {children}
            </Layout.Body>
        </Layout>
    )
}
