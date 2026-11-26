import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/react-vite"

const root = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import("@tailwindcss/vite")
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@pritish.budhiraja/ui/motion": join(root, "../../../packages/ui/src/motion.ts"),
        "@pritish.budhiraja/ui/charts": join(root, "../../../packages/ui/src/charts.ts"),
        "@pritish.budhiraja/ui": join(root, "../../../packages/ui/src/index.ts"),
      },
    }
    return config
  },
}

export default config
