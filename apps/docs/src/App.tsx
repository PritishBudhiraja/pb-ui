import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom"
import { loadAllDocs, loadDoc } from "./content/docs"
import { DocsLayout } from "./layout"
import { ThemeStateProvider } from "./theme"

const to = (path: string) => () => redirect(path)

// Routes load their code and data before the navigation commits, so the view transition
// cross-fades between two finished pages instead of a page and a loading state.
const router = createBrowserRouter([
  {
    element: <DocsLayout />,
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/home")).HomePage }) },
      {
        path: "components",
        loader: () => loadAllDocs(),
        lazy: async () => ({ Component: (await import("./pages/catalog")).CatalogPage }),
      },
      {
        path: "components/:slug",
        loader: async ({ params }) => {
          const doc = params.slug ? await loadDoc(params.slug) : undefined
          return doc ?? redirect("/components")
        },
        lazy: async () => ({ Component: (await import("./pages/component")).ComponentPage }),
      },
      {
        path: "foundations",
        lazy: async () => ({ Component: (await import("./pages/foundations")).FoundationsPage }),
      },
      {
        path: "agents",
        lazy: async () => ({ Component: (await import("./pages/agents")).AgentsPage }),
      },
      {
        path: "hooks",
        lazy: async () => ({ Component: (await import("./pages/overview")).HooksPage }),
      },
      {
        path: "changelog",
        lazy: async () => ({ Component: (await import("./pages/overview")).ChangelogPage }),
      },
      {
        path: "contributing",
        lazy: async () => ({ Component: (await import("./pages/overview")).ContributingPage }),
      },
      { path: "installation", loader: to("/#install") },
      { path: "getting-started", loader: to("/#install") },
      { path: "philosophy", loader: to("/foundations#philosophy") },
      { path: "colors", loader: to("/foundations#colors") },
      { path: "typography", loader: to("/foundations#typography") },
      { path: "spacing", loader: to("/foundations#spacing") },
      { path: "motion", loader: to("/foundations#motion") },
      { path: "themes", loader: to("/foundations#themes") },
      { path: "accessibility", loader: to("/foundations#accessibility") },
    ],
  },
])

export function App() {
  return (
    <ThemeStateProvider>
      <RouterProvider router={router} />
    </ThemeStateProvider>
  )
}
