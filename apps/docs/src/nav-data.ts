export const TABS = [
  { to: "/", label: "Overview", end: true },
  { to: "/components", label: "Components" },
  { to: "/foundations", label: "Foundations" },
  { to: "/agents", label: "Agents" },
] as const

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
