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
      "@pritish.budhiraja/ui/motion": join(root, "../../packages/ui/src/motion.ts"),
      "@pritish.budhiraja/ui": join(root, "../../packages/ui/src/index.ts"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/framer-motion")) return "motion"
          if (id.includes("node_modules/@radix-ui")) return "radix"
          if (id.includes("node_modules/cmdk")) return "cmdk"
          if (id.includes("pages/components")) return "component-docs"
        },
      },
    },
  },
})
