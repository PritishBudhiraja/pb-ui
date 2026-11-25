export interface NavItem {
  to: string
  label: string
  keywords?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { to: "/", label: "Introduction" },
      { to: "/installation", label: "Installation" },
      { to: "/getting-started", label: "Getting started" },
      { to: "/philosophy", label: "Design philosophy" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { to: "/colors", label: "Colors" },
      { to: "/typography", label: "Typography" },
      { to: "/spacing", label: "Spacing" },
      { to: "/motion", label: "Motion" },
      { to: "/themes", label: "Themes" },
      { to: "/accessibility", label: "Accessibility" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { to: "/components/button", label: "Button" },
      { to: "/components/icon-button", label: "IconButton" },
      { to: "/components/input", label: "Input" },
      { to: "/components/textarea", label: "Textarea" },
      { to: "/components/checkbox", label: "Checkbox" },
      { to: "/components/label", label: "Label" },
      { to: "/components/text", label: "Text" },
      { to: "/components/heading", label: "Heading" },
      { to: "/components/link-button", label: "LinkButton" },
      { to: "/components/keyboard-shortcut", label: "KeyboardShortcut" },
      { to: "/components/stack", label: "Stack" },
      { to: "/components/grid", label: "Grid" },
      { to: "/components/separator", label: "Separator" },
    ],
  },
  {
    title: "Forms",
    items: [
      { to: "/components/select", label: "Select" },
      { to: "/components/combobox", label: "Combobox" },
      { to: "/components/slider", label: "Slider" },
      { to: "/components/radio-group", label: "RadioGroup" },
      { to: "/components/switch", label: "Switch" },
      { to: "/components/form-field", label: "FormField" },
      { to: "/components/search-input", label: "SearchInput" },
      { to: "/components/date-picker", label: "DatePicker" },
      { to: "/components/time-picker", label: "TimePicker" },
      { to: "/components/filter-bar", label: "FilterBar" },
    ],
  },
  {
    title: "Overlays & feedback",
    items: [
      { to: "/components/dialog", label: "Dialog" },
      { to: "/components/alert-dialog", label: "AlertDialog" },
      { to: "/components/sheet", label: "Sheet" },
      { to: "/components/popover", label: "Popover" },
      { to: "/components/tooltip", label: "Tooltip" },
      { to: "/components/dropdown-menu", label: "DropdownMenu" },
      { to: "/components/context-menu", label: "ContextMenu" },
      { to: "/components/command-palette", label: "CommandPalette" },
      { to: "/components/toast", label: "Toast" },
      { to: "/components/alert", label: "Alert" },
      { to: "/components/empty-state", label: "EmptyState" },
      { to: "/components/error-state", label: "ErrorState" },
      { to: "/components/skeleton", label: "Skeleton" },
      { to: "/components/spinner", label: "Spinner" },
      { to: "/components/loading-button", label: "LoadingButton" },
      { to: "/components/progress-bar", label: "ProgressBar" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { to: "/components/tabs", label: "Tabs" },
      { to: "/components/accordion", label: "Accordion" },
      { to: "/components/breadcrumb", label: "Breadcrumb" },
      { to: "/components/pagination", label: "Pagination" },
      { to: "/components/navbar", label: "Navbar" },
      { to: "/components/sidebar", label: "Sidebar" },
      { to: "/components/app-shell", label: "AppShell" },
    ],
  },
  {
    title: "Data",
    items: [
      { to: "/components/badge", label: "Badge" },
      { to: "/components/avatar", label: "Avatar" },
      { to: "/components/card", label: "Card" },
      { to: "/components/table", label: "Table" },
      { to: "/components/data-table", label: "DataTable" },
      { to: "/components/timeline", label: "Timeline" },
      { to: "/components/stat-card", label: "StatCard" },
      { to: "/components/description-list", label: "DescriptionList" },
    ],
  },
  {
    title: "Signature",
    items: [
      { to: "/components/origin-button", label: "OriginButton" },
      { to: "/components/framed-container", label: "FramedContainer" },
      { to: "/components/hatch-divider", label: "HatchDivider" },
      { to: "/components/editorial-annotation", label: "EditorialAnnotation" },
      { to: "/components/calendar-heatmap", label: "CalendarHeatmap" },
      { to: "/components/theme-toggle", label: "ThemeToggle" },
      { to: "/components/scroll-progress", label: "ScrollProgress" },
      { to: "/components/surface", label: "Surface" },
    ],
  },
  {
    title: "Hooks",
    items: [{ to: "/hooks", label: "Hooks and utilities" }],
  },
  {
    title: "Project",
    items: [
      { to: "/changelog", label: "Changelog" },
      { to: "/contributing", label: "Contributing" },
    ],
  },
]

export function flattenNav() {
  return NAV.flatMap((group) => group.items)
}
