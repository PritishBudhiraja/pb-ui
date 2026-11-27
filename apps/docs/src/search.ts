import { flattenNav, NAV } from "./nav"

const PAGE_TEXT: Record<string, string> = {
  "/": "hatch editorial dashed origin-ripple tokens npm install agents",
  "/components":
    "catalog signature actions forms overlays navigation data schedule content presentation",
  "/foundations": "philosophy invariants colors typography spacing motion themes accessibility",
  "/agents": "llm prompt llms.txt cursor claude agents.md npm",
  "/hooks":
    "cn useClipboard useReducedMotion useToast useKeyboardShortcut useMediaQuery useDebounce useControlledState useClickOutside",
  "/changelog": "0.4.0 0.1.0 tokens primitives documentation npm",
  "/contributing": "agents lint test build pull request",
}

export function searchItems() {
  const groups = new Map(NAV.map((group) => [group.title, group.items.map((item) => item.to)]))
  const groupFor = (to: string) => {
    for (const [title, paths] of groups) {
      if (paths.includes(to)) return title
    }
    return "Docs"
  }

  return flattenNav()
    .filter((item) => !item.to.includes("#"))
    .map((item) => ({
      id: item.to,
      label: item.label,
      group: groupFor(item.to),
      href: item.to,
      keywords: `${item.keywords ?? ""} ${PAGE_TEXT[item.to] ?? ""}`,
    }))
}
