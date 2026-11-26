import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

function namesFrom(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1])
}

const index = readFileSync(join(root, "packages/ui/src/index.ts"), "utf8")
const motion = readFileSync(join(root, "packages/ui/src/motion.ts"), "utf8")
const charts = readFileSync(join(root, "packages/ui/src/charts.ts"), "utf8")
const catalog = readFileSync(join(root, "apps/docs/src/catalog.ts"), "utf8")
const llms = readFileSync(join(root, "apps/docs/public/llms.txt"), "utf8")

const exportNames = new Set([
  ...namesFrom(index, /export \{([^}]+)\}/gs).flatMap((block) =>
    namesFrom(block, /\b([A-Z][A-Za-z0-9]+)/g),
  ),
  ...namesFrom(motion, /\b([A-Z][A-Za-z0-9]+)/g),
  ...namesFrom(charts, /\b([A-Z][A-Za-z0-9]+)/g),
])

const catalogNames = namesFrom(catalog, /name: "([^"]+)"/g)
const missing = catalogNames.filter((name) => !exportNames.has(name) && name !== "Grid")

if (missing.length) {
  console.error("Catalog names missing from public exports:", missing.join(", "))
  process.exit(1)
}

for (const name of ["WeekCalendar", "RichTextEditor", "MarkdownRenderer", "OriginButton"]) {
  if (!llms.includes(name)) {
    console.error(`llms.txt is missing ${name}`)
    process.exit(1)
  }
}

console.log(`Catalog sync ok (${catalogNames.length} documented names).`)
