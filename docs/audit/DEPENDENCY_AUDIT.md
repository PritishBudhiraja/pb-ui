# Dependency audit

## Installed in PB UI (justified)

| Package                  | Why                                             | Alternatives      | Licence    |
| ------------------------ | ----------------------------------------------- | ----------------- | ---------- |
| react / react-dom        | Peer runtime                                    | —                 | MIT        |
| class-variance-authority | Variant APIs                                    | Manual class maps | Apache-2.0 |
| clsx + tailwind-merge    | `cn`                                            | —                 | MIT        |
| @radix-ui/*              | Accessible overlays, checkbox, toast, slot      | Headless UI       | MIT        |
| cmdk                     | Command palette primitive                       | Build from Dialog | MIT        |
| lucide-react             | Icons                                           | SVG copies        | ISC        |
| framer-motion            | Optional peer for OriginButton / ScrollProgress | CSS-only          | MIT        |
| tailwindcss v4           | Utility styling matching the portfolio          | vanilla CSS       | MIT        |
| tw-animate-css           | Toast enter/exit utilities                      | CSS keyframes     | MIT        |
| vite + vite-plugin-dts   | ESM + types                                     | tsup              | MIT        |
| vitest + testing-library | Component and util tests                        | jest              | MIT        |
| storybook 8              | Engineering workspace                           | Ladle             | MIT        |
| biome                    | Lint/format, same as portfolio                  | eslint            | MIT        |
| @changesets/cli          | Local versioning, no publish                    | —                 | MIT        |

## Explicitly not installed

Sonner, React DayPicker, TanStack Table/Virtual, Recharts, dnd-kit, FullCalendar, React Hook Form, Zod, next, next-themes, lenis, geist.

## Toast decision

Kept Radix Toast from the portfolio instead of Sonner so the existing API (`toast({ title, description })`) stays familiar. Revisit if Epoch needs a richer queue.

## Motion decision

`framer-motion` is an **optional peer**. Core `@pritishbudhiraja/ui` does not import it. `@pritishbudhiraja/ui/motion` does.
