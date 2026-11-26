import { flattenNav, NAV } from "./nav"

const PAGE_TEXT: Record<string, string> = {
  "/": "hatch editorial dashed origin-ripple tokens npm install agents",
  "/components": "catalog signature actions forms overlays navigation data",
  "/foundations": "philosophy invariants colors typography spacing motion themes accessibility",
  "/agents": "llm prompt llms.txt cursor claude agents.md npm",
  "/hooks":
    "cn useClipboard useReducedMotion useToast useKeyboardShortcut useMediaQuery useDebounce useControlledState useClickOutside",
  "/changelog": "0.4.0 0.1.0 tokens primitives documentation npm",
  "/contributing": "agents lint test build pull request",
  "/components/button": "button variant size ghost outline disabled asChild",
  "/components/icon-button": "icon button aria-label",
  "/components/copy-button": "copy clipboard",
  "/components/input": "input email label form",
  "/components/textarea": "textarea note form",
  "/components/checkbox": "checkbox radix checked",
  "/components/label": "label htmlFor",
  "/components/text": "text tone muted editorial paragraph",
  "/components/heading": "heading editorial heading serif italic",
  "/components/dialog": "dialog modal overlay focus trap",
  "/components/popover": "popover panel",
  "/components/tooltip": "tooltip hover focus",
  "/components/command-palette": "command palette cmdk search shortcut",
  "/components/toast": "toast notification queue",
  "/components/empty-state": "empty state dashed first run",
  "/components/origin-button": "origin button ripple filled outline href motion",
  "/components/framed-container": "framed container dashed column gutters site frame",
  "/components/hatch-divider": "hatch divider section rule",
  "/components/editorial-annotation": "editorial annotation handwritten margin note",
  "/components/calendar-heatmap": "calendar heatmap contributions grid",
  "/components/theme-toggle": "theme toggle view transition sun moon",
  "/components/scroll-progress": "scroll progress reading bar",
  "/components/surface": "surface dashed card",
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
