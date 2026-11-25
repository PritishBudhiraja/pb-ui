# Dependency audit

## Installed in PB UI (justified)

| Package                  | Why                                                | Alternatives      | Licence    |
| ------------------------ | -------------------------------------------------- | ----------------- | ---------- |
| react / react-dom        | Peer runtime                                       | —                 | MIT        |
| class-variance-authority | Variant APIs                                       | Manual class maps | Apache-2.0 |
| clsx + tailwind-merge    | `cn`                                               | —                 | MIT        |
| @radix-ui/*              | Accessible overlays, forms, nav, menus, progress   | Headless UI       | MIT        |
| cmdk                     | Command palette primitive                          | Build from Dialog | MIT        |
| lucide-react             | Icons                                              | SVG copies        | ISC        |
| framer-motion            | Optional peer for OriginButton / ScrollProgress    | CSS-only          | MIT        |
| tailwindcss v4           | Utility styling matching the portfolio             | vanilla CSS       | MIT        |
| tw-animate-css           | Toast enter/exit utilities                         | CSS keyframes     | MIT        |
| vite + vite-plugin-dts   | ESM + types (unbundled `.d.ts` under TypeScript 7) | tsup              | MIT        |
| @typescript/typescript6  | JS Compiler API for dts tooling under TypeScript 7 | wait for dts TS7  | MIT        |
| vitest + testing-library | Component and util tests                           | jest              | MIT        |
| @vitest/coverage-v8      | Coverage report in CI                              | c8                | MIT        |
| storybook 8              | Engineering workspace                              | Ladle             | MIT        |
| biome                    | Lint/format, same as portfolio                     | eslint            | MIT        |
| @changesets/cli          | Local versioning, no publish (v3, Node 22.11+)     | —                 | MIT        |

## Security overrides

`pnpm.overrides` pin nested tooling to patched releases. They are not runtime dependencies of `@pritishbudhiraja/ui`.

| Package   | Why                                                                | Pinned to |
| --------- | ------------------------------------------------------------------ | --------- |
| tinypool  | Vitest worker pool RCE advisories                                  | ^2.2.0    |
| uuid      | Storybook `addon-actions` buffer bounds check                      | ^11.1.1   |
| glob      | Storybook `vite-plugin-react-docgen-typescript` AbortSignal bypass | ^14.0.6   |
| minimatch | Nested glob / API Extractor globparts DoS                          | ^11.0.1   |

Vitest is on 5.x so `@vitest/mocker` and tinypool come from the patched tree. `uuid` stays on 11.x (patched) rather than 14.x because Storybook 8 still imports the v9/v11 API.

`vite-plugin-dts` / Volar still declare `typescript@<7`. Types are unbundled because API Extractor cannot follow `Omit` under TypeScript 7. `@typescript/typescript6` is the JS Compiler API fallback dts requires.

## Explicitly not installed

Sonner, React DayPicker, TanStack Table/Virtual, Recharts, dnd-kit, FullCalendar, React Hook Form, Zod, next, next-themes, lenis, geist, vaul.

DatePicker is a Popover + Calendar grid. No DayPicker. DataTable maps columns onto Table. Charts stay in product apps.

## Toast decision

Kept Radix Toast from the portfolio instead of Sonner so the existing API (`toast({ title, description })`) stays familiar. Revisit if Epoch needs a richer queue.

## Motion decision

`framer-motion` is an **optional peer**. Core `@pritishbudhiraja/ui` does not import it. `@pritishbudhiraja/ui/motion` does.
