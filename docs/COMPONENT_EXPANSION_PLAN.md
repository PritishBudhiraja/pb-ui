# Component expansion plan

Public APIs. Data in, callbacks out. Hatch semantic tokens only.

## Dates and time

- **DateRangePicker** — `{ from?: string; to?: string }` ISO. Calendar range highlight. No DayPicker.
- **DurationPicker** — hours + minutes. Value is total minutes. Optional ISO `PTnHnM` via helper.
- **TimeRangePicker** — `{ start: string; end: string }` as `HH:mm`. Invalid when end ≤ start.
- **WeekCalendar / TimeGrid / CalendarEvent** — `weekStart` ISO date; events `{ id, start, end, label }` with `YYYY-MM-DDTHH:mm`. Host owns recurrence and timezone.

## Lists and layout

- **SortableList** — `{ id, label }[]` + `onReorder(ids)`. Keyboard move up/down.
- **SplitWorkspace** — `react-resizable-panels` Group + Panel + Handle. Nav | main | inspector.
- **Sidebar** — `collapsed` + `onCollapsedChange`.
- **InspectorPanel** — title + children.

## Content

- **CodeBlock** — `code`, `label`. CopyButton. No toast in the library.
- **MarkdownRenderer** — string in, Hatch type tokens. No `rehype-raw`.
- **StreamingText** — `text` + `streaming`.
- **RichTextEditor** — HTML string, TipTap StarterKit.

## Status and viz

- **Stepper** internals for **MilestoneStepper** (numbered) and **WorkflowStepper** (named stages).
- **AIExecutionStatus** — `{ id, label, status: pending \| running \| done \| error }[]`.
- **TimeAllocationBar** — `{ label, value }[]` shares of a whole.
- **WeeklyActivityGrid** — `{ day, hour, value }[]`, 7×24.
- **ActivityTimeline** — items onto Timeline.
- **CountdownDisplay** — `remainingSeconds` from the host (host clocks).
- **Charts** — StackedBar / Area / Donut from `/charts`. CSS `currentColor` / token classes, not product hex.

## Utilities

- **FileDropzone** — native drag + file input. `onFiles(File[])`.
- **VirtualList** — `items`, `estimateSize`, render prop.

## Sequence

M1 packed consumers → M2 dates → M3 week calendar → M4 sortable → M5 content → M6 status/grids → M7 layout → M8 charts → M9 dropzone/virtual.
