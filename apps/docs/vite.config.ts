import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { componentMeta } from "./component-meta"

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss(), componentMeta(join(root, "src/content"))],
  resolve: {
    alias: {
      "@pritish.budhiraja/ui/motion": join(root, "../../packages/ui/src/motion.ts"),
      "@pritish.budhiraja/ui/charts": join(root, "../../packages/ui/src/charts.ts"),
      "@pritish.budhiraja/ui": join(root, "../../packages/ui/src/index.ts"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
