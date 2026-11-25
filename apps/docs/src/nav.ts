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
    ],
  },
  {
    title: "Overlays & feedback",
    items: [
      { to: "/components/dialog", label: "Dialog" },
      { to: "/components/popover", label: "Popover" },
      { to: "/components/tooltip", label: "Tooltip" },
      { to: "/components/command-palette", label: "CommandPalette" },
      { to: "/components/toast", label: "Toast" },
      { to: "/components/empty-state", label: "EmptyState" },
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
