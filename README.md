# PB UI

A React design system: editorial, minimal, and built to reuse across products.

- Tokens and themes in `@pritishbudhiraja/tokens`
- Components in `@pritishbudhiraja/ui`
- Motion pieces in `@pritishbudhiraja/ui/motion`
- Documentation site in `apps/docs`

## Packages

| Package                       | What it is                                                               |
| ----------------------------- | ------------------------------------------------------------------------ |
| `@pritishbudhiraja/tokens`    | Semantic CSS variables. `portfolio` and `epoch` themes (light and dark). |
| `@pritishbudhiraja/ui`        | React components. No Next.js APIs.                                       |
| `@pritishbudhiraja/ui/motion` | `OriginButton` and `ScrollProgress`. Optional `framer-motion` peer.      |

## Components

**Layout and type:** `FramedContainer`, `Surface`, `HatchDivider`, `EditorialAnnotation`, `Text`, `Heading`, `EditorialHeading`, `EmptyState`

**Actions:** `Button`, `IconButton`, `OriginButton`, `CopyButton`, `ThemeToggle`

**Forms:** `Input`, `Textarea`, `Label`, `Checkbox`

**Overlays:** `Dialog`, `Popover`, `Tooltip`, `CommandPalette`

**Feedback:** `Toast`, `Toaster`, `toast()`, `CalendarHeatmap`, `ScrollProgress`

**Utilities:** `cn`, `useClipboard`, `useReducedMotion`, `useToast`

## Usage

```tsx
import "@pritishbudhiraja/ui/styles.css"
import { Button, ThemeToggle, FramedContainer } from "@pritishbudhiraja/ui"
import { OriginButton } from "@pritishbudhiraja/ui/motion"
```

Set the palette on the document root:

```html
<html data-theme="portfolio">
```

Add `class="dark"` for dark mode. `ThemeToggle` is controlled: pass `theme` and `setTheme`. Load fonts in the host app; override `--pb-font-sans`, `--pb-font-serif`, `--pb-font-display`, and `--pb-font-hand` as needed.

The packages are not on npm yet. Consume them from this workspace or from GitHub.

## Develop

Node 20+ and pnpm. Run commands from the repository root.

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm dev
```

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `pnpm dev`        | Docs at http://localhost:5173                |
| `pnpm storybook`  | Component workbench at http://localhost:6006 |
| `pnpm build`      | Library ESM, types, and CSS                  |
| `pnpm build:docs` | Static docs site                             |
| `pnpm test`       | Vitest                                       |
| `pnpm lint`       | Biome and TypeScript                         |

## More

- [Design spec](docs/specifications/DESIGN_SYSTEM_SPEC.md)
- [Architecture](docs/architecture/ARCHITECTURE.md)
- [Contributing](docs/CONTRIBUTING.md)
- [AGENTS.md](AGENTS.md)

## License

MIT. See [LICENSE](LICENSE).
