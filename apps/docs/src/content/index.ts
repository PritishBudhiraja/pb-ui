import meta from "virtual:component-meta"
import { CATEGORIES } from "./categories"
import type { CatalogCategory, CatalogEntry } from "./types"

export const ENTRIES: Record<string, CatalogEntry> = Object.fromEntries(
  meta.map((entry) => [entry.slug, entry]),
)

const listed = new Set(CATEGORIES.flatMap((category) => category.slugs))
const unlisted = Object.keys(ENTRIES).filter((slug) => !listed.has(slug))
if (unlisted.length) throw new Error(`Docs in no category: ${unlisted.join(", ")}`)

export const CATALOG: CatalogCategory[] = CATEGORIES.map(({ slugs, ...category }) => ({
  ...category,
  items: slugs.map((slug) => {
    const entry = ENTRIES[slug]
    if (!entry)
      throw new Error(`Category ${category.id} lists ${slug} but content/${slug}.tsx is missing`)
    return entry
  }),
}))
