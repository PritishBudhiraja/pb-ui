import { CATALOG, type CatalogCategory, FOUNDATION_SECTIONS, PROJECT_NAV, TABS } from "./catalog"

export interface NavItem {
  to: string
  label: string
  keywords?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export { TABS }

export const COMPONENT_NAV: NavGroup[] = CATALOG.map((category: CatalogCategory) => ({
  title: category.title,
  items: category.items.map((item) => ({
    to: `/components/${item.slug}`,
    label: item.name,
  })),
}))

// On the overview every block is on the page, so links jump to it and follow the scroll.
const COMPONENT_OVERVIEW_NAV: NavGroup[] = CATALOG.map((category: CatalogCategory) => ({
  title: category.title,
  items: category.items.map((item) => ({
    to: `/components#${item.slug}`,
    label: item.name,
  })),
}))

export const FOUNDATION_NAV: NavGroup[] = [
  {
    title: "Foundations",
    items: FOUNDATION_SECTIONS.map((section) => ({
      to: `/foundations#${section.id}`,
      label: section.label,
    })),
  },
]

export const PROJECT_NAV_GROUP: NavGroup[] = [
  {
    title: "Project",
    items: PROJECT_NAV.map((item) => ({ to: item.to, label: item.label })),
  },
]

/** Full flattened nav for search and redirects. */
export const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { to: "/", label: "Overview" },
      { to: "/components", label: "Components" },
      { to: "/foundations", label: "Foundations" },
      { to: "/agents", label: "Agents" },
    ],
  },
  ...COMPONENT_NAV,
  ...FOUNDATION_NAV,
  {
    title: "Utilities",
    items: [{ to: "/hooks", label: "Hooks and utilities" }],
  },
  ...PROJECT_NAV_GROUP,
]

export function flattenNav() {
  return NAV.flatMap((group) => group.items)
}

export function sidebarFor(pathname: string): NavGroup[] | null {
  if (pathname === "/components") return COMPONENT_OVERVIEW_NAV
  if (pathname.startsWith("/components/")) return COMPONENT_NAV
  if (pathname === "/foundations") return FOUNDATION_NAV
  if (pathname === "/hooks" || pathname === "/changelog" || pathname === "/contributing") {
    return PROJECT_NAV_GROUP
  }
  return null
}
