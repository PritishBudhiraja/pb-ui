# Deployment

The docs site builds with `pnpm build:docs` and is hosted on Vercel at [ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com).

## npm packages

`@pritish.budhiraja/tokens` and `@pritish.budhiraja/ui` are public (no paid npm plan). Publish from GitHub Actions, not from a laptop.

Publishing uses npm [trusted publishing](https://docs.npmjs.com/trusted-publishers): GitHub Actions proves its identity with an OIDC token, so there is no npm token to store or rotate.

1. Each package has a trusted publisher for repo `PritishBudhiraja/pb-ui`, workflow `release.yml`, with publish allowed. To set one up (npm 11.15+, your login and 2FA):

   ```bash
   npm trust github @pritish.budhiraja/ui --repo PritishBudhiraja/pb-ui --file release.yml --allow-publish
   ```

   Run it again for `@pritish.budhiraja/tokens`. A new package must be published once by hand before it can have a trusted publisher.
2. To release, add a changeset and merge to `main`. The Release workflow runs after CI passes on `main` and opens a "Version packages" PR. Merging it runs `pnpm test:pack`, then `scripts/publish.mjs`, which publishes any version that is not on npm yet, then `scripts/tag-releases.mjs` tags it and creates a GitHub Release.

The same workflow opens a Version PR when there are changesets, then publishes when that PR lands.
