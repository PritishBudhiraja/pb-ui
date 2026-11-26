# Consumer readiness

Measured on 26 Nov 2026. Consumers install Hatch through public `package.json` exports (`dist`), not the source aliases used by docs and Storybook. Nothing was published to npm.

## Pack

```bash
pnpm --filter @pritish.budhiraja/ui build
pnpm --filter @pritish.budhiraja/ui pack --pack-destination /tmp/hatch-pack
pnpm --filter @pritish.budhiraja/tokens pack --pack-destination /tmp/hatch-pack
```

| Tarball                           | Contents                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `@pritish.budhiraja/ui@0.4.0`     | `dist/` (including `index.js`, `motion.js`, `charts.js`, `styles.css`), `package.json`, license, changelog, readme. No `src/`. |
| `@pritish.budhiraja/tokens@0.1.1` | `src/index.css`, `src/themes/portfolio.css`, `package.json`, license, changelog, readme.                                       |

`dist/index.js` does not mention `recharts` or `framer-motion`. Client modules keep a `"use client"` banner (for example `date-range-picker.js`, `motion.js`).

## Consumers

`apps/vite-consumer` and `apps/next-consumer` depend on `workspace:*` and import `@pritish.budhiraja/ui`, `@pritish.budhiraja/ui/motion`, and `@pritish.budhiraja/ui/styles.css`. Vite has no package aliases. Next uses `experimental.optimizePackageImports` so the barrel does not pull `SplitWorkspace` / `react-resizable-panels` into a page that only uses `Button`.

| App  | Command                                                | Result                                            |
| ---- | ------------------------------------------------------ | ------------------------------------------------- |
| UI   | `pnpm --filter @pritish.budhiraja/ui typecheck`        | pass                                              |
| UI   | `pnpm --filter @pritish.budhiraja/ui test`             | 134 passed (30 files)                             |
| UI   | `pnpm --filter @pritish.budhiraja/ui build`            | ESM `preserveModules` + CSS                       |
| Vite | `pnpm --filter @pritish.budhiraja/vite-consumer build` | pass (`index.html` + 43.55 kB CSS + 409.02 kB JS) |
| Next | `pnpm --filter @pritish.budhiraja/next-consumer build` | pass on Next 16.4.6 (static `/`)                  |

## Issues found and fixed

1. **TypeScript 7 vs Next 15.** `next.config.ts` crashed (`fileExists` undefined). `next build` then refused TypeScript 7. The consumer uses `next.config.mjs` and Next 16.2+.
2. **Webpack barrel.** Next 15 compiled the whole `index.js` import graph, including `react-resizable-panels`, which statically imports React `Activity` (19.2+). `optimizePackageImports` on Next 16 compiles a `Button` / `ThemeToggle` page without that path.
3. **`ThemeToggle.setTheme`.** `(theme: string) => void` rejected `useState<"light" \| "dark">`. The prop is now `(theme: "light" \| "dark") => void`.
4. **`DateRangePicker`.** `formatRange` accepts an optional locale because `useFormatLocale` can be undefined.
5. **`RichTextEditor`.** TipTap `setContent` uses `{ emitUpdate: false }` instead of the old boolean argument.
