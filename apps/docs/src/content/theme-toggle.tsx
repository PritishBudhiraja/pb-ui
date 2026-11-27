import { ThemeToggle } from "@pritish.budhiraja/ui"
import { useDocsTheme } from "../theme"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

function ThemeTogglePreview() {
  const { mode, setMode } = useDocsTheme()
  return (
    <Preview code={`<ThemeToggle theme={theme} setTheme={setTheme} />`}>
      <ThemeToggle theme={mode} setTheme={(next) => setMode(next === "dark" ? "dark" : "light")} />
    </Preview>
  )
}

export const doc: ComponentDoc = {
  slug: "theme-toggle",
  name: "ThemeToggle",
  when: "Host-controlled light/dark with a circular view transition.",
  keywords: "theme toggle view transition sun moon",
  sibling: "You own storage (next-themes, localStorage).",
  title: "ThemeToggle",
  kicker: "Signature",
  why: "The circular view-transition clip is the Hatch theme change. The host owns storage so Next, Vite, and extensions can disagree on persistence.",
  whenNot:
    "Do not wrap next-themes inside the library. Pass theme, resolvedTheme, and setTheme from the host.",
  related: [{ slug: "icon-button", name: "IconButton" }],
  description:
    "Circular View Transition clip. Pass theme and setTheme. This page uses the docs theme store.",
  preview: <ThemeTogglePreview />,
  code: "",
  a11y: "IconButton with aria-pressed for dark mode. Reduced motion skips the clip-path animation.",
  props: [
    { name: "theme", type: "string", description: "light | dark | system" },
    {
      name: "resolvedTheme",
      type: "string",
      description: "Actual light or dark when theme is system (for example from next-themes)",
    },
    { name: "setTheme", type: '(theme: "light" | "dark") => void', description: "Host setter" },
    { name: "label", type: "string", description: "Accessible name. Default Toggle theme" },
  ],
}
