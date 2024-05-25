import { ErrorBoundary } from "shared/react";
import { AppRouter } from "./AppRouter";

import './app.css'

export function App() {

    /**
     * TODO:
     * Despite the ErrorBoundary wrap all the app,
     *  react router will still catch the errors and show the error page.
     */
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    )
}
