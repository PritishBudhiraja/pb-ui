# Component backlog

## Shipped

**First pass:** Button, IconButton, Input, Textarea, Label, Checkbox, Dialog, Popover, Tooltip, Toast, CommandPalette, ThemeToggle, HatchDivider, Surface, EmptyState, Text, Heading, EditorialHeading, CopyButton, OriginButton, FramedContainer, EditorialAnnotation, CalendarHeatmap, ScrollProgress.

**Catalogue:** Select, Combobox, Slider, RadioGroup, Switch, FormField, FormError, SearchInput, DatePicker, TimePicker, AlertDialog, Sheet/Drawer, DropdownMenu, ContextMenu, Alert, Skeleton, Spinner, LoadingButton, ErrorState, ProgressBar, ProgressRing, Tabs, Accordion, Breadcrumb, Pagination, Sidebar, AppShell, Navbar, MobileNavigation, Badge, Avatar, Card, Table, DataTable, Timeline, StatCard, DescriptionList, Stack, Grid, Separator, LinkButton, KeyboardShortcut, FilterBar, ScrollArea.

**Hooks:** `cn`, `useClipboard`, `useReducedMotion`, `useToast`, `useKeyboardShortcut`, `useMediaQuery`, `useDebounce`, `useControlledState`, `useClickOutside`.

## Intentionally not in the library

- **Charts** — keep Recharts (and similar) out of core. Compose in the product.
- **useTheme** — host owns `data-theme` / `.dark` (ADR-003).
- **DayPicker / TanStack Table** — DatePicker is a Hatch calendar in a popover; DataTable is a thin column mapper.

## Later if a product needs it

Virtualized tables, rich calendars, command-style combobox with cmdk, and chart primitives.
