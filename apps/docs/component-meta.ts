import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Plugin } from "vite"

const ID = "virtual:component-meta"
const RESOLVED = `\0${ID}`
const FIELDS = ["slug", "name", "when", "sibling", "keywords"] as const

// The nav, home page and search need only names and slugs. Reading them from the source
// keeps one file per component without bundling every preview into the first load.
function readMeta(dir: string) {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".tsx") && file !== "shared.tsx")
    .map((file) => {
      const source = readFileSync(join(dir, file), "utf8")
      const meta: Record<string, string> = {}
      for (const field of FIELDS) {
        const match = new RegExp(`\\b${field}:\\s*("(?:[^"\\\\]|\\\\.)*")`).exec(source)
        if (match?.[1]) meta[field] = JSON.parse(match[1])
      }
      if (meta.slug !== file.replace(/\.tsx$/, "")) {
        throw new Error(`content/${file} documents slug ${meta.slug ?? "(none)"}`)
      }
      return meta
    })
}

export function componentMeta(contentDir: string): Plugin {
  return {
    name: "component-meta",
    resolveId: (id) => (id === ID ? RESOLVED : undefined),
    load(id) {
      if (id !== RESOLVED) return
      this.addWatchFile(contentDir)
      for (const file of readdirSync(contentDir)) this.addWatchFile(join(contentDir, file))
      return `export default ${JSON.stringify(readMeta(contentDir))}`
    },
    handleHotUpdate({ file, server }) {
      if (!file.startsWith(contentDir)) return
      const module = server.moduleGraph.getModuleById(RESOLVED)
      if (module) server.moduleGraph.invalidateModule(module)
    },
  }
}
