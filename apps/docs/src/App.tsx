import { lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DocsLayout } from "./layout"
import { ThemeStateProvider } from "./theme"

const HomePage = lazy(() => import("./pages/home").then((module) => ({ default: module.HomePage })))
const CatalogPage = lazy(() =>
  import("./pages/catalog").then((module) => ({ default: module.CatalogPage })),
)
const FoundationsPage = lazy(() =>
  import("./pages/foundations").then((module) => ({ default: module.FoundationsPage })),
)
const AgentsPage = lazy(() =>
  import("./pages/agents").then((module) => ({ default: module.AgentsPage })),
)
const HooksPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.HooksPage })),
)
const ChangelogPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.ChangelogPage })),
)
const ContributingPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.ContributingPage })),
)
const ComponentPage = lazy(() =>
  import("./pages/components").then((module) => ({ default: module.ComponentPage })),
)

export function App() {
  return (
    <ThemeStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DocsLayout />}>
            <Route index element={<HomePage />} />
            <Route path="components" element={<CatalogPage />} />
            <Route path="components/:slug" element={<ComponentPage />} />
            <Route path="foundations" element={<FoundationsPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="hooks" element={<HooksPage />} />
            <Route path="changelog" element={<ChangelogPage />} />
            <Route path="contributing" element={<ContributingPage />} />
            <Route path="installation" element={<Navigate to="/#install" replace />} />
            <Route path="getting-started" element={<Navigate to="/#install" replace />} />
            <Route path="philosophy" element={<Navigate to="/foundations#philosophy" replace />} />
            <Route path="colors" element={<Navigate to="/foundations#colors" replace />} />
            <Route path="typography" element={<Navigate to="/foundations#typography" replace />} />
            <Route path="spacing" element={<Navigate to="/foundations#spacing" replace />} />
            <Route path="motion" element={<Navigate to="/foundations#motion" replace />} />
            <Route path="themes" element={<Navigate to="/foundations#themes" replace />} />
            <Route
              path="accessibility"
              element={<Navigate to="/foundations#accessibility" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeStateProvider>
  )
}
