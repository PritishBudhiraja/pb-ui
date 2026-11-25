import { flattenNav, NAV } from "./nav"

const PAGE_TEXT: Record<string, string> = {
  "/": "personal design system editorial dashed hatch origin-ripple tokens primitives documentation",
  "/installation": "install pnpm add styles.css workspace github package",
  "/getting-started": "import css data-theme dark class fonts motion entry",
  "/philosophy": "minimal editorial calm keyboard accessible composable dashed hatch annotation",
  "/colors": "semantic variables background foreground primary muted border destructive editorial",
  "/typography": "sans serif hand mono heading editorial instrument inter source serif caveat",
  "/spacing": "720 1120 hatch radius column frame",
  "/motion": "view transition origin button spring reduced motion framer",
  "/themes": "portfolio epoch light dark data-theme",
  "/accessibility": "wcag focus-visible label dialog command palette heatmap",
  "/hooks":
    "cn useClipboard useReducedMotion useToast useKeyboardShortcut useMediaQuery useDebounce useControlledState useClickOutside",
  "/changelog": "0.1.0 tokens primitives documentation",
  "/contributing": "agents lint test build pull request",
  "/components/button": "button variant size ghost outline disabled asChild",
  "/components/icon-button": "icon button aria-label search",
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

  return flattenNav().map((item) => ({
    id: item.to,
    label: item.label,
    group: groupFor(item.to),
    href: item.to,
    keywords: `${item.keywords ?? ""} ${PAGE_TEXT[item.to] ?? ""}`,
  }))
}
