import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DocsLayout } from "./layout"
import { ComponentPage } from "./pages/components"
import {
  AccessibilityPage,
  ChangelogPage,
  ColorsPage,
  ContributingPage,
  GettingStartedPage,
  HooksPage,
  InstallationPage,
  IntroductionPage,
  MotionPage,
  PhilosophyPage,
  SpacingPage,
  ThemesPage,
  TypographyPage,
} from "./pages/overview"
import { ThemeStateProvider } from "./theme"

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
