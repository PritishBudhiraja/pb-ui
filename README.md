# Hatch

A React design system: editorial, minimal, and built to reuse across products. The packages still live under `@pritishbudhiraja/*`; this repo is `pb-ui`.

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

**Layout and type:** `FramedContainer`, `Surface`, `HatchDivider`, `EditorialAnnotation`, `Text`, `Heading`, `EditorialHeading`, `EmptyState`, `Stack`, `Grid`, `Separator`, `Card`

**Actions:** `Button`, `IconButton`, `LinkButton`, `OriginButton`, `CopyButton`, `ThemeToggle`, `LoadingButton`

**Forms:** `Input`, `Textarea`, `Label`, `Checkbox`, `Select`, `Combobox`, `Slider`, `RadioGroup`, `Switch`, `FormField`, `SearchInput`, `DatePicker`, `TimePicker`, `FilterBar`

**Overlays:** `Dialog`, `AlertDialog`, `Sheet`/`Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `CommandPalette`

**Feedback:** `Toast`, `Alert`, `Skeleton`, `Spinner`, `ErrorState`, `ProgressBar`, `ProgressRing`, `CalendarHeatmap`, `ScrollProgress`

**Navigation and data:** `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `Navbar`, `Sidebar`, `AppShell`, `Badge`, `Avatar`, `Table`, `DataTable`, `Timeline`, `StatCard`, `DescriptionList`

**Utilities:** `cn`, `useClipboard`, `useReducedMotion`, `useToast`, `useKeyboardShortcut`, `useMediaQuery`, `useDebounce`, `useControlledState`, `useClickOutside`

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

## More

- [Design spec](docs/specifications/DESIGN_SYSTEM_SPEC.md)
- [Architecture](docs/architecture/ARCHITECTURE.md)
- [Contributing](docs/CONTRIBUTING.md)
- [AGENTS.md](AGENTS.md)

## License

MIT. See [LICENSE](LICENSE).
