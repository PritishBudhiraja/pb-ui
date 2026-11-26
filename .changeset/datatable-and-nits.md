---
"@pritish.budhiraja/ui": minor
---

DataTable gains sortable columns (`sortValue` per column, `sort` / `defaultSort` / `onSortChange`, `manualSort` for server-side sorting), an empty state (`emptyText`) and loading placeholder rows (`loading`, `loadingRows`). Sortable headers are buttons, and the header cell carries `aria-sort`. New exported types: `DataTableProps`, `DataTableSort`, `DataTableSortDirection`.

Components no longer use `forwardRef`; `ref` is a regular prop (React 19), and the `displayName` assignments are gone. `useMediaQuery` now uses `useSyncExternalStore` and returns `false` during server rendering and hydration. `useReducedMotion` is built on it.
