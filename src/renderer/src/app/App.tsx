import { ErrorBoundary } from "shared/react";
import { AppRouter } from "./AppRouter";

import './app.css'

export function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    )
}
