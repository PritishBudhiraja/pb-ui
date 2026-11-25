import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pritishbudhiraja/ui/motion": join(root, "../../packages/ui/src/motion.ts"),
      "@pritishbudhiraja/ui": join(root, "../../packages/ui/src/index.ts"),
    },
  },
  server: {
    port: 5173,
  },
})
