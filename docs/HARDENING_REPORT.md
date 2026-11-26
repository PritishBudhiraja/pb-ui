# Hatch v0.5.x hardening

Measured in this repo after the P0/P1 pass. One Hatch identity. No Epoch theme.

## P0

### Calendar

Extended `WeekCalendar` / `TimeGrid` / `CalendarEvent` instead of adding FullCalendar. See ADR-006.

| Requirement                | Result                                                            |
| -------------------------- | ----------------------------------------------------------------- |
| Overlapping layout         | Column packing per day, cluster `colCount`                        |
| Cross-midnight / multi-day | Split into visible day segments                                   |
| Clip to visible hours      | Segments outside `startHour`–`endHour` drop                       |
| Invalid / zero-length      | Dropped                                                           |
| Now indicator              | `data-now` line; pass `now` for tests; `showNow={false}` hides it |
| Empty-slot selection       | `onSlotSelect({ start, end })` on hour cells                      |
| Drag / resize              | Pointer + `onEventChange`; host persists                          |
| Keyboard                   | Arrows move 15m, Shift+Arrow resizes, Left/Right ±1 day           |
| Responsive                 | Horizontal scroll, `min-w-[40rem]`                                |
| Domain logic               | None. Civil strings in, callbacks out                             |

### Published package smoke

`consumers/vite` and `consumers/next` are **not** workspace members. `pnpm test:pack` builds Hatch, packs tarballs, `npm install`s them with React 19.2, typechecks, and production-builds.

Checks: public exports (`ui`, `ui/motion`, `ui/charts`, `styles.css`, `tailwind.css`), Instrument Serif in the host, light/dark `ThemeToggle`, Next SSR note + hydration island, optional motion/charts.

### RichTextEditor

Empty string from the parent calls `setContent`. `placeholder` is an overlay while TipTap is empty. `editable={false}` disables the toolbar and `setEditable`. Vitest file `rich-text-editor.test.tsx` uses a real editor, not the expansion mock.

### React

Peer range is `^19.2.0`. `react-resizable-panels` needs `Activity`. Isolating SplitWorkspace to a new entry was rejected this pass so the public barrel stays stable; optional `/editor` and `/sortable` entries were evaluated and deferred (preserveModules already tree-shakes named ESM imports).

## P1

| Item                        | Result                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| Browser interaction         | Playwright: editor typing, slot select, theme toggle, serif family                                  |
| Visual light/dark           | Computed `background-color` `rgb(255, 255, 255)` vs `rgb(10, 10, 10)` — Hatch tokens, not Chromatic |
| Optional editor/dnd entries | Evaluated; not added. Revisit if a consumer imports the barrel and hits TipTap/dnd weight           |
| Bundle measurement          | See `CONSUMER_READINESS.md` and `artifacts/published/smoke.json` after `pnpm test:pack`             |
| GFM                         | `remark-gfm` for tables and strikethrough                                                           |
| Markdown images             | Off by default; `allowImages` + `https:` only, `referrerPolicy=no-referrer`                         |
| Vulnerability check         | `pnpm audit:deps` (`--audit-level=high`) in CI and Release                                          |
| Storybook CI                | `pnpm build:storybook`                                                                              |
| Docs / llms / catalog       | `pnpm test:catalog` fails if a catalog name is missing from public exports                          |

## Remaining limitations

- Recurrence, timezones, and resource calendars stay in the host (or a product-owned FullCalendar).
- `now` is a snapshot unless the host passes an updating `now`.
- Pixel screenshots are not stored; visual checks are token RGB. Cross-OS screenshot baselines were deferred.
- Optional `/editor`, `/sortable`, and `/layout` package entries are not shipped.
- Workspace Vite/Next apps still use `workspace:*` for day-to-day; packed consumers are the release contract.

## Stop expanding

Do not add Hatch components unless a real consuming app demonstrates a gap these primitives cannot compose.
