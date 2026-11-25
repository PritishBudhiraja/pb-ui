# Documentation architecture

- Public site: `apps/docs` (Vite + React Router). `pnpm dev` serves it on port 5173.
- The site imports `@pritishbudhiraja/ui` and `@pritishbudhiraja/ui/motion`.
- Storybook: `pnpm storybook` on port 6006, for isolated component work.
