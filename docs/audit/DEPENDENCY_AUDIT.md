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
| @changesets/cli          | Versioning and npm publish (v3, Node 22.11+)       | —                 | MIT        |

## Security overrides

`pnpm.overrides` pin nested tooling to patched releases. They are not runtime dependencies of `@pritish.budhiraja/ui`.

| Package   | Why                                                                | Pinned to |
| --------- | ------------------------------------------------------------------ | --------- |
| tinypool  | Vitest worker pool RCE advisories                                  | ^2.2.0    |
| uuid      | Storybook `addon-actions` buffer bounds check                      | ^11.1.1   |
| glob      | Storybook `vite-plugin-react-docgen-typescript` AbortSignal bypass | ^14.0.6   |
| minimatch | Nested glob / API Extractor globparts DoS                          | ^11.0.1   |

Vitest is on 5.x so `@vitest/mocker` and tinypool come from the patched tree. `uuid` stays on 11.x (patched) rather than 14.x because Storybook 8 still imports the v9/v11 API.

`vite-plugin-dts` / Volar still declare `typescript@<7`. Types are unbundled because API Extractor cannot follow `Omit` under TypeScript 7. `@typescript/typescript6` is the JS Compiler API fallback dts requires.

## Expansion (ADR-005)

| Package                            | Why                               | Alternatives         | Licence |
| ---------------------------------- | --------------------------------- | -------------------- | ------- |
| @dnd-kit/core, sortable, utilities | SortableList + keyboard reorder   | HTML DnD             | MIT     |
| @tiptap/react, pm, starter-kit     | RichTextEditor chrome             | Lexical, textarea    | MIT     |
| react-markdown                     | MarkdownRenderer without raw HTML | marked + DOMPurify   | MIT     |
| remark-gfm                         | GFM tables and strikethrough      | hand-rolled GFM      | MIT     |
| react-resizable-panels             | SplitWorkspace                    | custom split         | MIT     |
| recharts                           | Optional `/charts` entry only     | product-owned charts | MIT     |
| @tanstack/react-virtual            | VirtualList                       | windowing by hand    | MIT     |

Next.js and `@tailwindcss/postcss` are only dependencies of `apps/next-consumer`. They are not part of `@pritish.budhiraja/ui`. The consumer uses Next 16.2+ because Next 15 cannot load TypeScript 7 (no JavaScript compiler API). The library itself does not depend on Next.

## Explicitly not installed

Sonner, React DayPicker, TanStack Table, FullCalendar, React Hook Form, Zod, next-themes, lenis, geist, vaul, react-dropzone, rehype-raw, @tiptap/extension-placeholder (placeholder is an overlay).

`@playwright/test` is a root CI dependency for browser interaction and token visual checks. It is not a runtime dependency of `@pritish.budhiraja/ui`.

DatePicker is a Popover + Calendar grid. No DayPicker. DataTable maps columns onto Table. Charts are an optional entry, not core `index.js`.

## Toast decision

Kept Radix Toast from the portfolio instead of Sonner so the existing API (`toast({ title, description })`) stays familiar. Revisit if Epoch needs a richer queue.

## Motion decision

`framer-motion` is an **optional peer**. Core `@pritish.budhiraja/ui` does not import it. `@pritish.budhiraja/ui/motion` does.
