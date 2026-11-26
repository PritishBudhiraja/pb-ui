# Deployment

The docs site builds with `pnpm build:docs` and is hosted on Vercel at [ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com).

## npm packages

`@pritish.budhiraja/tokens` and `@pritish.budhiraja/ui` are public (no paid npm plan). Publish from GitHub Actions, not from a laptop.

1. Create a [granular access token](https://www.npmjs.com/settings/~/tokens) with **Read and write**, permission to publish new packages under `@pritish.budhiraja`, and **bypass 2FA** for automation.
2. Add it as the repo secret `NPM_TOKEN` (`Settings → Secrets and variables → Actions`).
3. First public versions (`0.1.0`) are already on npm. Later versions: add a changeset and merge to `main`.
4. Optional: add a **Trusted Publisher** on each package — GitHub user `PritishBudhiraja`, repo `pb-ui`, workflow `release.yml`, allow `npm publish` — then OIDC can replace the long-lived token.

The same workflow opens a Version PR when there are changesets, then publishes when that PR lands.
