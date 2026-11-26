/// <reference types="vitest/config" />
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import dts from "vite-plugin-dts"

// Rollup drops module-level directives, so record which sources start with
// "use client" and put it back as the banner of that module's output file.
function preserveUseClient(): Plugin {
  const clientModules = new Set<string>()
  return {
    name: "preserve-use-client",
    transform(code, id) {
      const file = id.split("?")[0]
      if (/^\s*["']use client["']/.test(code)) clientModules.add(file)
      return null
    },
    outputOptions(options) {
      return {
        ...options,
        banner: (chunk) => {
          const file = chunk.facadeModuleId?.split("?")[0]
          return file && clientModules.has(file) ? '"use client";\n' : ""
        },
      }
    },
  }
}

export default defineConfig({
  plugins: [
    preserveUseClient(),
    react(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test/**", "src/styles.css"],
      bundleTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, "src/index.ts"),
        motion: resolve(import.meta.dirname, "src/motion.ts"),
        charts: resolve(import.meta.dirname, "src/charts.ts"),
      },
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
        warn(warning)
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/client",
        "framer-motion",
        "cmdk",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "react-markdown",
        "react-resizable-panels",
        "recharts",
        /^@dnd-kit\//,
        /^@tiptap\//,
        /^@tanstack\//,
        /^@radix-ui\//,
        "@pritish.budhiraja/tokens",
      ],
    },
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    testTimeout: 20_000,
    maxWorkers: 4,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.*", "src/test/**", "src/styles.css"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
})
