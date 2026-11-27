import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const contentDir = join(root, "apps/docs/src/content")

function namesFrom(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1])
}

const index = readFileSync(join(root, "packages/ui/src/index.ts"), "utf8")
const motion = readFileSync(join(root, "packages/ui/src/motion.ts"), "utf8")
const charts = readFileSync(join(root, "packages/ui/src/charts.ts"), "utf8")
const categories = readFileSync(join(contentDir, "categories.ts"), "utf8")
const llmsFiles = ["llms.txt", "llms-full.txt"].map((file) => ({
  file,
  text: readFileSync(join(root, "apps/docs/public", file), "utf8"),
}))

const errors = []

const exportNames = new Set([
  ...namesFrom(index, /export \{([^}]+)\}/gs).flatMap((block) =>
    namesFrom(block, /\b([A-Z][A-Za-z0-9]+)/g),
  ),
  ...namesFrom(motion, /\b([A-Z][A-Za-z0-9]+)/g),
  ...namesFrom(charts, /\b([A-Z][A-Za-z0-9]+)/g),
])

// Top-level fields of `export const doc` sit at two-space indent; props and related are nested deeper.
const FIELD = /^ {2}(slug|name|when):\s*("(?:[^"\\]|\\.)*")/gm
const docs = readdirSync(contentDir)
  .filter((file) => file.endsWith(".tsx") && file !== "shared.tsx")
  .map((file) => {
    const source = readFileSync(join(contentDir, file), "utf8")
    const entry = {}
    for (const [, key, value] of source.slice(source.indexOf("export const doc")).matchAll(FIELD)) {
      entry[key] ??= JSON.parse(value)
    }
    return { file, entry }
  })
for (const { file, entry } of docs) {
  for (const field of ["slug", "name", "when"]) {
    if (!entry[field]) errors.push(`content/${file} has no top-level ${field}`)
  }
  if (entry.slug && file !== `${entry.slug}.tsx`) {
    errors.push(`content/${file} documents slug ${entry.slug}; rename the file to match`)
  }
}

const listed = namesFrom(categories, /slugs: \[([^\]]*)\]/g).flatMap((block) =>
  namesFrom(block, /"([^"]+)"/g),
)
const documented = new Set(docs.map(({ entry }) => entry.slug))
const seen = new Set()
for (const slug of listed) {
  if (seen.has(slug)) errors.push(`categories.ts lists ${slug} more than once`)
  seen.add(slug)
  if (!documented.has(slug))
    errors.push(`categories.ts lists ${slug} but content/${slug}.tsx is missing`)
}
for (const slug of documented) {
  if (!seen.has(slug)) errors.push(`content/${slug}.tsx is in no category in categories.ts`)
}

const names = docs.map(({ entry }) => entry.name).filter(Boolean)
const notExported = names.filter((name) => !exportNames.has(name))
if (notExported.length) {
  errors.push(`Documented names missing from public exports: ${notExported.join(", ")}`)
}

for (const { file, text } of llmsFiles) {
  const missing = names.filter((name) => !new RegExp(`\\b${name}\\b`).test(text))
  if (missing.length) errors.push(`${file} is missing ${missing.join(", ")}`)
}

if (errors.length) {
  for (const error of errors) console.error(error)
  process.exit(1)
}

console.log(`Catalog sync ok (${names.length} documented names in ${listed.length} slots).`)
