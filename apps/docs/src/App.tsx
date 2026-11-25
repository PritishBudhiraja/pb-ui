import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DocsLayout } from "./layout"
import { ThemeStateProvider } from "./theme"

const IntroductionPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.IntroductionPage })),
)
const InstallationPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.InstallationPage })),
)
const GettingStartedPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.GettingStartedPage })),
)
const PhilosophyPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.PhilosophyPage })),
)
const ColorsPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.ColorsPage })),
)
const TypographyPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.TypographyPage })),
)
const SpacingPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.SpacingPage })),
)
const MotionPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.MotionPage })),
)
const ThemesPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.ThemesPage })),
)
const AccessibilityPage = lazy(() =>
  import("./pages/overview").then((module) => ({ default: module.AccessibilityPage })),
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
            <Route index element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="philosophy" element={<PhilosophyPage />} />
            <Route path="colors" element={<ColorsPage />} />
            <Route path="typography" element={<TypographyPage />} />
            <Route path="spacing" element={<SpacingPage />} />
            <Route path="motion" element={<MotionPage />} />
            <Route path="themes" element={<ThemesPage />} />
            <Route path="accessibility" element={<AccessibilityPage />} />
            <Route path="components/:slug" element={<ComponentPage />} />
            <Route path="hooks" element={<HooksPage />} />
            <Route path="changelog" element={<ChangelogPage />} />
            <Route path="contributing" element={<ContributingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeStateProvider>
  )
}
