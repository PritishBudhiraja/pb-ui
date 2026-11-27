# Architecture

pnpm workspace with two publishable packages (`tokens`, `ui`) and a private docs app.

```
apps/docs          docs site, renders every component live
packages/tokens    CSS variables and theme files
packages/ui        React components, hooks, compiled styles.css
docs               specifications and ADRs
```

No extra packages for motion, hooks, or icons until bundle measurements require them. Motion is an **export path**, not a package.

## Runtime rules

- React 19 peer; no bundled React
- ESM + `.d.ts`
- CSS is a side-effect import: `@pritish.budhiraja/ui/styles.css`
- No `window` access during render except inside client effects
- Compatible with Next.js client components and Vite SPAs
