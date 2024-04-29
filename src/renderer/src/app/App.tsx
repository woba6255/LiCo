import { ThemeProvider } from "shared/ui";
import { AppRouter } from "./AppRouter.tsx";
import { ErrorBoundary } from "shared/react";

import './index.css'

function App() {
  return (
      <ErrorBoundary>
          <ThemeProvider>
              <AppRouter />
          </ThemeProvider>
      </ErrorBoundary>
  )
}

export default App
