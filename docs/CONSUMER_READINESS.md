# Consumer readiness

Hatch `@pritish.budhiraja/ui@0.5.0` and `@pritish.budhiraja/tokens@0.1.2` are on npm. This document tracks **packed HEAD** (what the next release will be) plus the 0.5.0 registry baseline.

React peer: **19.2+**.

## Packed HEAD (CI)

```bash
pnpm test:pack
```

That command is independent of `workspace:*`. It `pnpm pack`s `ui` and `tokens`, copies `consumers/vite` and `consumers/next`, `npm install`s the tarballs, typechecks, and production-builds.

| App              | What it proves                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `consumers/vite` | `styles.css`, motion, charts, ThemeToggle, WeekCalendar, MarkdownRenderer, Instrument Serif, light/dark |
| `consumers/next` | Tailwind v4 `@import "@pritish.budhiraja/ui/tailwind.css"`, SSR note, client island, RichTextEditor     |

Next 16 defaults to Turbopack, which `require()`s Tailwind's ESM. The fixture builds with `next build --webpack`.

Results are written to `artifacts/published/smoke.json` (gitignored). Re-run locally after changing exports.

Workspace apps `apps/vite-consumer` and `apps/next-consumer` still use `workspace:*` for fast iteration. They are **not** the publish contract.

## Registry baseline (0.5.0 / 0.1.2)

Installed 26 Nov 2026 from npm, before this hardening pass:

- `@pritish.budhiraja/ui@0.5.0` exports `.`, `./motion`, `./charts`, `./styles.css`, `./tailwind.css`.
- `@pritish.budhiraja/tokens@0.1.2` exports CSS only.

Known 0.5.0 issues fixed in HEAD (next minor):

1. `RichTextEditor` ignored `value=""` (did not clear).
2. `placeholder` was in the type and unused.
3. Week grid stacked overlapping events in one column and dropped midnight splits.
4. Peer range claimed React 19.0 while `SplitWorkspace` needs 19.2.

## Issues found earlier (still true)

1. **TypeScript 7 vs Next 15.** Packed Next consumer uses Next 16 and a self-contained `tsconfig` (TypeScript 5.9 in the published fixture) so declaration emit is tested against a typical app compiler.
2. **Webpack barrel.** Next 16 `optimizePackageImports` keeps `Button` pages off `react-resizable-panels`.
3. **`ThemeToggle.setTheme`** is `"light" \| "dark"`.
