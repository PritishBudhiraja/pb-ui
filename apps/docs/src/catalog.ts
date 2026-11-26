export interface CatalogEntry {
  slug: string
  name: string
  when: string
  sibling?: string
}

export interface CatalogCategory {
  id: string
  title: string
  purpose: string
  items: CatalogEntry[]
}

export const TABS = [
  { to: "/", label: "Overview", end: true },
  { to: "/components", label: "Components" },
  { to: "/foundations", label: "Foundations" },
  { to: "/agents", label: "Agents" },
] as const

export const CATALOG: CatalogCategory[] = [
  {
    id: "signature",
    title: "Signature",
    purpose:
      "The pieces that make Hatch recognizable: dashed frames, hatch rules, handwritten asides, origin-ripple actions, and the contribution heatmap. Use these when the screen should feel like the portfolio, not a generic dashboard.",
    items: [
      {
        slug: "origin-button",
        name: "OriginButton",
        when: "Primary call to action that should carry the signature ripple.",
        sibling: "Button for quiet actions; LinkButton for text-style links.",
      },
      {
        slug: "framed-container",
        name: "FramedContainer",
        when: "Page chrome with dashed column gutters.",
        sibling: "Surface for inner cards.",
      },
      {
        slug: "hatch-divider",
        name: "HatchDivider",
        when: "Section rule between editorial blocks.",
        sibling: "Separator for tight UI lists.",
      },
      {
        slug: "editorial-annotation",
        name: "EditorialAnnotation",
        when: "Handwritten margin note or aside.",
        sibling: "Alert for operational messages.",
      },
      {
        slug: "calendar-heatmap",
        name: "CalendarHeatmap",
        when: "Year of activity with a text summary.",
        sibling: "Not a date picker — use DatePicker for choosing a day.",
      },
      {
        slug: "theme-toggle",
        name: "ThemeToggle",
        when: "Host-controlled light/dark with a circular view transition.",
        sibling: "You own storage (next-themes, localStorage).",
      },
      {
        slug: "scroll-progress",
        name: "ScrollProgress",
        when: "Reading progress on long articles.",
        sibling: "Import from @pritish.budhiraja/ui/motion.",
      },
      {
        slug: "surface",
        name: "Surface",
        when: "Dashed inner panel.",
        sibling: "Card when you need header/title/footer structure.",
      },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    purpose:
      "Buttons and links. Keep OriginButton for the one action that should feel authored; everything else stays quiet.",
    items: [
      {
        slug: "button",
        name: "Button",
        when: "Default, outline, ghost, and sizes.",
        sibling: "OriginButton for signature CTAs.",
      },
      {
        slug: "icon-button",
        name: "IconButton",
        when: "Icon-only control. Requires a label.",
        sibling: "Button when the action has visible text.",
      },
      {
        slug: "link-button",
        name: "LinkButton",
        when: "Looks like a text link, behaves like a button or asChild link.",
        sibling: "Button outline for bordered actions.",
      },
      {
        slug: "loading-button",
        name: "LoadingButton",
        when: "Submit in flight.",
        sibling: "Button plus Spinner if you need a custom layout.",
      },
      {
        slug: "copy-button",
        name: "CopyButton",
        when: "Copy a value with clipboard feedback.",
        sibling: "useClipboard when the trigger is custom.",
      },
    ],
  },
  {
    id: "forms",
    title: "Forms",
    purpose:
      "Labeled inputs with Hatch tokens. Compose with FormField instead of inventing another field wrapper.",
    items: [
      {
        slug: "input",
        name: "Input",
        when: "Single-line text.",
        sibling: "SearchInput for filter bars.",
      },
      { slug: "textarea", name: "Textarea", when: "Multiline notes." },
      { slug: "label", name: "Label", when: "Associate text with a control via htmlFor." },
      { slug: "checkbox", name: "Checkbox", when: "Boolean or multi-select." },
      { slug: "switch", name: "Switch", when: "Immediate on/off, not a form submit." },
      { slug: "radio-group", name: "RadioGroup", when: "One of a small set." },
      {
        slug: "select",
        name: "Select",
        when: "One of a known list.",
        sibling: "Combobox when the list is long or searchable.",
      },
      { slug: "combobox", name: "Combobox", when: "Filterable list." },
      { slug: "slider", name: "Slider", when: "Numeric range." },
      {
        slug: "form-field",
        name: "FormField",
        when: "Label, control, description, and error stacked.",
      },
      { slug: "search-input", name: "SearchInput", when: "Filter or command search." },
      { slug: "date-picker", name: "DatePicker", when: "Pick a calendar day." },
      { slug: "date-range-picker", name: "DateRangePicker", when: "Pick from and to ISO dates." },
      { slug: "time-picker", name: "TimePicker", when: "Pick a clock time." },
      { slug: "time-range-picker", name: "TimeRangePicker", when: "Start and end HH:mm." },
      {
        slug: "duration-picker",
        name: "DurationPicker",
        when: "Hours and minutes as total minutes.",
      },
      { slug: "filter-bar", name: "FilterBar", when: "Row of filters above a table." },
    ],
  },
  {
    id: "overlays",
    title: "Overlays and feedback",
    purpose:
      "Focus traps, toasts, and empty states. Prefer Dialog for decisions, Sheet for extra context, CommandPalette for jumping.",
    items: [
      { slug: "dialog", name: "Dialog", when: "Modal task." },
      { slug: "alert-dialog", name: "AlertDialog", when: "Destructive confirm." },
      { slug: "sheet", name: "Sheet", when: "Side panel. Drawer is an alias." },
      { slug: "popover", name: "Popover", when: "Small anchored panel." },
      { slug: "tooltip", name: "Tooltip", when: "Short hover/focus hint." },
      { slug: "dropdown-menu", name: "DropdownMenu", when: "Action menu from a trigger." },
      { slug: "context-menu", name: "ContextMenu", when: "Right-click menu." },
      {
        slug: "command-palette",
        name: "CommandPalette",
        when: "⌘K jump list. Pass items from the host.",
      },
      { slug: "toast", name: "Toast", when: "Transient confirmation. Mount Toaster once." },
      { slug: "alert", name: "Alert", when: "Inline status, not a toast." },
      { slug: "empty-state", name: "EmptyState", when: "First-run or no results." },
      { slug: "error-state", name: "ErrorState", when: "Failed load with retry." },
      { slug: "skeleton", name: "Skeleton", when: "Placeholder while loading." },
      { slug: "spinner", name: "Spinner", when: "Indeterminate wait." },
      { slug: "progress-bar", name: "ProgressBar", when: "Determinate bar or ring." },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    purpose:
      "Chrome for apps. Hatch Navbar is a shell — hosts still own Next Link, hash scrolling, and brand.",
    items: [
      { slug: "tabs", name: "Tabs", when: "In-page panels." },
      { slug: "accordion", name: "Accordion", when: "Collapsible sections." },
      { slug: "breadcrumb", name: "Breadcrumb", when: "Path back to parent pages." },
      { slug: "pagination", name: "Pagination", when: "Paged lists." },
      { slug: "navbar", name: "Navbar", when: "Header shell with brand and spacer." },
      { slug: "sidebar", name: "Sidebar", when: "Sectioned nav list." },
      {
        slug: "collapsible-sidebar",
        name: "CollapsibleSidebar",
        when: "Sidebar with a collapsed rail.",
      },
      { slug: "app-shell", name: "AppShell", when: "Sidebar plus main." },
      {
        slug: "split-workspace",
        name: "SplitWorkspace",
        when: "Resizable nav, main, and inspector.",
      },
      { slug: "resizable-panel", name: "ResizablePanel", when: "A pane inside SplitWorkspace." },
      { slug: "inspector-panel", name: "InspectorPanel", when: "Titled third column." },
      { slug: "keyboard-shortcut", name: "KeyboardShortcut", when: "Visible kbd hint." },
    ],
  },
  {
    id: "data",
    title: "Data and type",
    purpose:
      "Read-only structure. Typography components exist so products share scale without inventing heading classes.",
    items: [
      { slug: "text", name: "Text", when: "Body copy with tone." },
      { slug: "heading", name: "Heading", when: "UI heading. EditorialHeading for serif display." },
      { slug: "badge", name: "Badge", when: "Status pill." },
      { slug: "avatar", name: "Avatar", when: "Photo or initials." },
      { slug: "card", name: "Card", when: "Structured panel with header." },
      { slug: "table", name: "Table", when: "Simple HTML table styling." },
      { slug: "data-table", name: "DataTable", when: "Sortable rows from column config." },
      { slug: "timeline", name: "Timeline", when: "Dated events." },
      { slug: "stat-card", name: "StatCard", when: "Single metric." },
      { slug: "description-list", name: "DescriptionList", when: "Term/detail pairs." },
      { slug: "stack", name: "Stack", when: "Vertical or horizontal gap." },
      { slug: "grid", name: "Grid", when: "Equal columns." },
      { slug: "separator", name: "Separator", when: "Hairline rule in UI chrome." },
    ],
  },
  {
    id: "schedule",
    title: "Schedule",
    purpose: "Civil dates and week grids. Timezone stays in the host.",
    items: [
      {
        slug: "week-calendar",
        name: "WeekCalendar",
        when: "Week of timed events with overlap packing.",
      },
      { slug: "time-grid", name: "TimeGrid", when: "Same grid as WeekCalendar." },
      { slug: "calendar-event", name: "CalendarEvent", when: "Event chip in the grid." },
      { slug: "sortable-list", name: "SortableList", when: "Reorder a list." },
    ],
  },
  {
    id: "content",
    title: "Content and AI",
    purpose: "Markdown, editor chrome, and stage lists. No product workflow inside Hatch.",
    items: [
      { slug: "code-block", name: "CodeBlock", when: "Copyable snippet." },
      {
        slug: "markdown-renderer",
        name: "MarkdownRenderer",
        when: "Render GFM markdown. No raw HTML. Images off by default.",
      },
      { slug: "rich-text-editor", name: "RichTextEditor", when: "HTML editor with Hatch chrome." },
      { slug: "streaming-text", name: "StreamingText", when: "Append-only model output." },
      { slug: "ai-execution-status", name: "AIExecutionStatus", when: "Stage list for a run." },
      { slug: "workflow-stepper", name: "WorkflowStepper", when: "Named stages." },
      { slug: "milestone-stepper", name: "MilestoneStepper", when: "Numbered stages." },
    ],
  },
  {
    id: "viz",
    title: "Presentation",
    purpose: "Allocation, activity, countdown, and optional Recharts via /charts.",
    items: [
      { slug: "time-allocation-bar", name: "TimeAllocationBar", when: "Shares of a whole." },
      { slug: "weekly-activity-grid", name: "WeeklyActivityGrid", when: "Hour × day intensity." },
      { slug: "activity-timeline", name: "ActivityTimeline", when: "Items on Timeline." },
      {
        slug: "countdown-display",
        name: "CountdownDisplay",
        when: "Host-owned remaining seconds.",
      },
      { slug: "stacked-bar-chart", name: "StackedBarChart", when: "Import from /charts." },
      { slug: "area-chart", name: "AreaChart", when: "Import from /charts." },
      { slug: "donut-chart", name: "DonutChart", when: "Import from /charts." },
      { slug: "file-dropzone", name: "FileDropzone", when: "Drop or browse files." },
      { slug: "virtual-list", name: "VirtualList", when: "Long lists without mounting every row." },
    ],
  },
]

export const FOUNDATION_SECTIONS = [
  { id: "philosophy", label: "Philosophy" },
  { id: "invariants", label: "Invariants" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "motion", label: "Motion" },
  { id: "themes", label: "Themes" },
  { id: "accessibility", label: "Accessibility" },
] as const

export const PROJECT_NAV = [
  { to: "/hooks", label: "Hooks" },
  { to: "/changelog", label: "Changelog" },
  { to: "/contributing", label: "Contributing" },
] as const

export function flattenCatalog() {
  return CATALOG.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.title, categoryId: category.id })),
  )
}
