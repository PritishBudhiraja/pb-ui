# Contributing

Follow `AGENTS.md`. `pnpm install` installs a pre-commit hook that runs Biome on staged files. Run `pnpm lint`, `pnpm test`, and `pnpm build` before opening a PR, and `pnpm test:pack` when you change `packages/` or `consumers/`. Coverage must stay at 90% overall and 100% for `src/lib` and `src/hooks`. Add a changeset for publishable package changes. Releases: GitHub Actions `Release` workflow (`@pritish.budhiraja/tokens` and `@pritish.budhiraja/ui` on npm). Do not stop at expanding Hatch unless a real app needs a new primitive.
