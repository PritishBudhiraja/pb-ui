# ADR-003 Theme provider lives in the app

- **Status:** accepted
- **Context:** Portfolio wraps `next-themes`
- **Selected:** ThemeToggle is controlled (`theme`, `setTheme`). No ThemeProvider in the library.
- **Rationale:** Vite apps should not take a Next-oriented dependency. Storage is an app concern.
- **Validation:** Storybook drives the toggle with React state
