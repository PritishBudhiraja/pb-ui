import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pritish.budhiraja/ui/motion": join(root, "../packages/ui/src/motion.ts"),
      "@pritish.budhiraja/ui/charts": join(root, "../packages/ui/src/charts.ts"),
      "@pritish.budhiraja/ui": join(root, "../packages/ui/src/index.ts"),
    },
  },
  server: {
    port: 4177,
    strictPort: true,
  },
})
