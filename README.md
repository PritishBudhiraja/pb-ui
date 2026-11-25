# Hatch

A React design system: editorial, minimal, and built to reuse across products. Packages publish as `@pritish.budhiraja/*`; this repo is `pb-ui`.

- Docs: [ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com)
- [`@pritish.budhiraja/tokens`](https://www.npmjs.com/package/@pritish.budhiraja/tokens)
- [`@pritish.budhiraja/ui`](https://www.npmjs.com/package/@pritish.budhiraja/ui)
- Motion: `@pritish.budhiraja/ui/motion`

## Packages

| Package                       | What it is                                                               |
| ----------------------------- | ------------------------------------------------------------------------ |
| `@pritish.budhiraja/tokens`    | Semantic CSS variables. `portfolio` and `epoch` themes (light and dark). |
| `@pritish.budhiraja/ui`        | React components. No Next.js APIs.                                       |
| `@pritish.budhiraja/ui/motion` | `OriginButton` and `ScrollProgress`. Optional `framer-motion` peer.      |

## Components

**Layout and type:** `FramedContainer`, `Surface`, `HatchDivider`, `EditorialAnnotation`, `Text`, `Heading`, `EditorialHeading`, `EmptyState`, `Stack`, `Grid`, `Separator`, `Card`

**Actions:** `Button`, `IconButton`, `LinkButton`, `OriginButton`, `CopyButton`, `ThemeToggle`, `LoadingButton`

**Forms:** `Input`, `Textarea`, `Label`, `Checkbox`, `Select`, `Combobox`, `Slider`, `RadioGroup`, `Switch`, `FormField`, `SearchInput`, `DatePicker`, `TimePicker`, `FilterBar`

**Overlays:** `Dialog`, `AlertDialog`, `Sheet`/`Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `CommandPalette`

**Feedback:** `Toast`, `Alert`, `Skeleton`, `Spinner`, `ErrorState`, `ProgressBar`, `ProgressRing`, `CalendarHeatmap`, `ScrollProgress`

**Navigation and data:** `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `Navbar`, `Sidebar`, `AppShell`, `Badge`, `Avatar`, `Table`, `DataTable`, `Timeline`, `StatCard`, `DescriptionList`

**Utilities:** `cn`, `useClipboard`, `useReducedMotion`, `useToast`, `useKeyboardShortcut`, `useMediaQuery`, `useDebounce`, `useControlledState`, `useClickOutside`

## Usage

```bash
pnpm add @pritish.budhiraja/ui
```

```tsx
import "@pritish.budhiraja/ui/styles.css"
import { Button, ThemeToggle, FramedContainer } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
```

Set the palette on the document root:

```html
<html data-theme="portfolio">
```

Add `class="dark"` for dark mode. `ThemeToggle` is controlled: pass `theme` and `setTheme`. Load fonts in the host app; override `--pb-font-sans`, `--pb-font-serif`, `--pb-font-display`, and `--pb-font-hand` as needed.

## Develop

Node 22.11+ and pnpm. Run commands from the repository root.

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

## Host the docs (Vercel)

On the import screen, Vercel lists `docs`, `storybook`, and `ui`. Import **docs** only (`Import single project`). Skip Storybook and the UI package. Leave environment variables empty.

That sets Root Directory to `apps/docs`. `apps/docs/vercel.json` installs from the repo root so the pnpm workspace still builds.

Production: [https://ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com) (`ui` CNAME → `cname.vercel-dns.com`, DNS only). Vercel also serves [https://pb-ui-phi.vercel.app](https://pb-ui-phi.vercel.app).

## More

- [Design spec](docs/specifications/DESIGN_SYSTEM_SPEC.md)
- [Architecture](docs/architecture/ARCHITECTURE.md)
- [Contributing](docs/CONTRIBUTING.md)
- [AGENTS.md](AGENTS.md)

## License

MIT. See [LICENSE](LICENSE).
