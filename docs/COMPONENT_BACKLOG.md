# Component backlog

## Shipped

**First pass:** Button, IconButton, Input, Textarea, Label, Checkbox, Dialog, Popover, Tooltip, Toast, CommandPalette, ThemeToggle, HatchDivider, Surface, EmptyState, Text, Heading, EditorialHeading, CopyButton, OriginButton, FramedContainer, EditorialAnnotation, CalendarHeatmap, ScrollProgress.

**Catalogue:** Select, Combobox, Slider, RadioGroup, Switch, FormField, FormError, SearchInput, DatePicker, TimePicker, AlertDialog, Sheet/Drawer, DropdownMenu, ContextMenu, Alert, Skeleton, Spinner, LoadingButton, ErrorState, ProgressBar, ProgressRing, Tabs, Accordion, Breadcrumb, Pagination, Sidebar, AppShell, Navbar, MobileNavigation, Badge, Avatar, Card, Table, DataTable, Timeline, StatCard, DescriptionList, Stack, Grid, Separator, LinkButton, KeyboardShortcut, FilterBar, ScrollArea.

**Hooks:** `cn`, `useClipboard`, `useReducedMotion`, `useToast`, `useKeyboardShortcut`, `useMediaQuery`, `useDebounce`, `useControlledState`, `useClickOutside`.

## Expansion (this pass)

DateRangePicker, DurationPicker, TimeRangePicker, WeekCalendar, TimeGrid, CalendarEvent, SortableList, SplitWorkspace, collapsible Sidebar, InspectorPanel, CodeBlock, MarkdownRenderer, StreamingText, RichTextEditor, AIExecutionStatus, WorkflowStepper, MilestoneStepper, TimeAllocationBar, WeeklyActivityGrid, ActivityTimeline, CountdownDisplay, FileDropzone, VirtualList, and optional `/charts` (StackedBar, Area, Donut).

## Intentionally not in the library

- **useTheme** — host owns `data-theme` / `.dark` (ADR-003).
- **DayPicker / TanStack Table / FullCalendar** — DatePicker is a Hatch calendar in a popover; DataTable is a thin column mapper; week view is a Hatch grid.
- **Epoch domain widgets** — SeasonCard, GoalTree, TaskBoard, FocusSession, and the rest of that product surface.

## Later if a product needs it

Virtualized tables, FullCalendar if recurrence/timezones outgrow the Hatch grid, optional `/editor` and `/sortable` package entries, shadcn registry. Do not expand the catalogue without a real consumer.
