# Package architecture

## `@pritish.budhiraja/tokens`

Source CSS only. No JS build. Exports:

- `.` / `index.css`
- `themes/portfolio.css`
- `themes/epoch.css`

## `@pritish.budhiraja/ui`

Vite library build:

- `dist/index.js` + `dist/index.d.ts`
- `dist/motion.js` + `dist/motion.d.ts`
- `dist/styles.css` (Tailwind-compiled utilities used by components)

Externals: react, react-dom, framer-motion, radix, cmdk, lucide, cva, clsx, tailwind-merge.

## Storybook

Aliases packages to TypeScript source so components iterate without a watch build. Production consumers use `dist`.
