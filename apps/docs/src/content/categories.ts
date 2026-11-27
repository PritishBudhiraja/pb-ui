export interface CategoryDef {
  id: string
  title: string
  purpose: string
  slugs: string[]
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "signature",
    title: "Signature",
    purpose:
      "The pieces that make Hatch recognizable: dashed frames, hatch rules, handwritten asides, origin-ripple actions, and the contribution heatmap. Use these when the screen should feel like the portfolio, not a generic dashboard.",
    slugs: [
      "origin-button",
      "framed-container",
      "hatch-divider",
      "editorial-annotation",
      "calendar-heatmap",
      "theme-toggle",
      "scroll-progress",
      "surface",
    ],
  },
  {
    id: "actions",
    title: "Actions",
    purpose:
      "Buttons and links. Keep OriginButton for the one action that should feel authored; everything else stays quiet.",
    slugs: ["button", "icon-button", "link-button", "loading-button", "copy-button"],
  },
  {
    id: "forms",
    title: "Forms",
    purpose:
      "Labeled inputs with Hatch tokens. Compose with FormField instead of inventing another field wrapper.",
    slugs: [
      "input",
      "textarea",
      "label",
      "checkbox",
      "switch",
      "radio-group",
      "select",
      "combobox",
      "slider",
      "form-field",
      "search-input",
      "date-picker",
      "date-range-picker",
      "time-picker",
      "time-range-picker",
      "duration-picker",
      "filter-bar",
    ],
  },
  {
    id: "overlays",
    title: "Overlays and feedback",
    purpose:
      "Focus traps, toasts, and empty states. Prefer Dialog for decisions, Sheet for extra context, CommandPalette for jumping.",
    slugs: [
      "dialog",
      "alert-dialog",
      "sheet",
      "popover",
      "tooltip",
      "dropdown-menu",
      "context-menu",
      "command-palette",
      "toast",
      "alert",
      "empty-state",
      "error-state",
      "skeleton",
      "spinner",
      "progress-bar",
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    purpose:
      "Chrome for apps. Hatch Navbar is a shell — hosts still own Next Link, hash scrolling, and brand.",
    slugs: [
      "tabs",
      "accordion",
      "breadcrumb",
      "pagination",
      "navbar",
      "sidebar",
      "collapsible-sidebar",
      "app-shell",
      "split-workspace",
      "resizable-panel",
      "inspector-panel",
      "keyboard-shortcut",
    ],
  },
  {
    id: "data",
    title: "Data and type",
    purpose:
      "Read-only structure. Typography components exist so products share scale without inventing heading classes.",
    slugs: [
      "text",
      "heading",
      "badge",
      "avatar",
      "card",
      "table",
      "data-table",
      "timeline",
      "stat-card",
      "description-list",
      "stack",
      "grid",
      "separator",
    ],
  },
  {
    id: "schedule",
    title: "Schedule",
    purpose: "Civil dates and week grids. Timezone stays in the host.",
    slugs: ["week-calendar", "time-grid", "calendar-event", "sortable-list"],
  },
  {
    id: "content",
    title: "Content and AI",
    purpose: "Markdown, editor chrome, and stage lists. No product workflow inside Hatch.",
    slugs: [
      "code-block",
      "markdown-renderer",
      "rich-text-editor",
      "streaming-text",
      "ai-execution-status",
      "workflow-stepper",
      "milestone-stepper",
    ],
  },
  {
    id: "viz",
    title: "Presentation",
    purpose: "Allocation, activity, countdown, and optional Recharts via /charts.",
    slugs: [
      "time-allocation-bar",
      "weekly-activity-grid",
      "activity-timeline",
      "countdown-display",
      "stacked-bar-chart",
      "area-chart",
      "donut-chart",
      "file-dropzone",
      "virtual-list",
    ],
  },
]
