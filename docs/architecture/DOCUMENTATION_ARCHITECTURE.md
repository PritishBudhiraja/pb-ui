# Documentation architecture

- Public site: `apps/docs` (Vite + React Router). `pnpm dev` serves it on port 5173.
- The site imports `@pritish.budhiraja/ui` and `@pritish.budhiraja/ui/motion`.
- Each component's docs page and live preview live in `apps/docs/src/content/<slug>.tsx`.
