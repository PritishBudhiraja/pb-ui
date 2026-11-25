# Deployment

The docs site builds with `pnpm build:docs` and is hosted on Vercel at [ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com).

## npm packages

`@pritish.budhiraja/tokens` and `@pritish.budhiraja/ui` are public (no paid npm plan). Publish from GitHub Actions, not from a laptop.

1. Create a [granular access token](https://www.npmjs.com/settings/~/tokens) with **Read and write**, permission to publish new packages under `@pritish.budhiraja`, and **bypass 2FA** for automation.
2. Add it as the repo secret `NPM_TOKEN` (`Settings → Secrets and variables → Actions`).
3. Run **Actions → Release → Run workflow**. That publishes the current versions (`0.1.0` the first time).
4. After the packages exist on npm, add a **Trusted Publisher** on each package: GitHub user `PritishBudhiraja`, repo `pb-ui`, workflow `release.yml`, allow `npm publish`. OIDC can then replace the long-lived token.

Later versions: add a changeset, merge to `main`. The same workflow opens a Version PR, then publishes when that PR lands.
