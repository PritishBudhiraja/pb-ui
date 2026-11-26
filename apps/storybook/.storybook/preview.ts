import type { Preview } from "@storybook/react"
import "./storybook.css"

const THEME_PRESETS = ["light", "dark"] as const

type ThemePreset = (typeof THEME_PRESETS)[number]

function isThemePreset(value: unknown): value is ThemePreset {
  return THEME_PRESETS.some((preset) => preset === value)
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const value = isThemePreset(context.globals.theme) ? context.globals.theme : "light"
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", value === "dark")
        document.documentElement.dataset.theme = "portfolio"
      }
      return Story()
    },
  ],
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: "todo" },
  },
}

export default preview
