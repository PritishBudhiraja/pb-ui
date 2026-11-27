# Package architecture

## `@pritish.budhiraja/tokens`

Source CSS only. No JS build. Exports:

- `.` / `index.css`
- `themes/portfolio.css`

## `@pritish.budhiraja/ui`

Vite library build:

- `dist/index.js` + `dist/index.d.ts`
- `dist/motion.js` + `dist/motion.d.ts`
- `dist/styles.css` (Tailwind-compiled utilities used by components)

Externals: react, react-dom, framer-motion, radix, cmdk, lucide, cva, clsx, tailwind-merge.

Source: `src/components/<category>/<component>.tsx`, one folder per docs category (signature, actions, forms, overlays, navigation, data, schedule, content, presentation). A component's test sits next to it as `<component>.test.tsx`. Consumers import only from the package entry points, so folders are internal.
