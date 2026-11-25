import type { Preview } from "@storybook/react"
import "./storybook.css"

const THEME_PRESETS = ["portfolio-light", "portfolio-dark", "epoch-light", "epoch-dark"] as const

type ThemePreset = (typeof THEME_PRESETS)[number]

function isThemePreset(value: unknown): value is ThemePreset {
  return THEME_PRESETS.some((preset) => preset === value)
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "portfolio-light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "portfolio-light", title: "Portfolio Light" },
          { value: "portfolio-dark", title: "Portfolio Dark" },
          { value: "epoch-light", title: "Epoch Light (candidate)" },
          { value: "epoch-dark", title: "Epoch Dark (candidate)" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const value = isThemePreset(context.globals.theme) ? context.globals.theme : "portfolio-light"
      const isDark = value.endsWith("-dark")
      const isEpoch = value.startsWith("epoch")
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", isDark)
        document.documentElement.dataset.theme = isEpoch ? "epoch" : "portfolio"
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
