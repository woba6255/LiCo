import { ThemeProvider } from "shared/ui";
import { ErrorBoundary } from "shared/react";
import { AppRouter } from "./AppRouter.tsx";

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
