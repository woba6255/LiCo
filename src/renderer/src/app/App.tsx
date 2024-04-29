import { AppRouter } from "./AppRouter.tsx";
import { ErrorBoundary } from "shared/ui";

import './index.css'

function App() {
  return (
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
  )
}

export default App
