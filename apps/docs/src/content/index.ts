import { CATEGORIES } from "./categories"
import type { CatalogCategory, ComponentDoc } from "./types"

const modules = import.meta.glob<ComponentDoc>(["./*.tsx", "!./shared.tsx"], {
  eager: true,
  import: "doc",
})

export const DOCS: Record<string, ComponentDoc> = {}
for (const [path, doc] of Object.entries(modules)) {
  if (path !== `./${doc.slug}.tsx`) throw new Error(`${path} documents slug ${doc.slug}`)
  DOCS[doc.slug] = doc
}

const listed = new Set(CATEGORIES.flatMap((category) => category.slugs))
const unlisted = Object.keys(DOCS).filter((slug) => !listed.has(slug))
if (unlisted.length) throw new Error(`Docs in no category: ${unlisted.join(", ")}`)

export const CATALOG: CatalogCategory[] = CATEGORIES.map(({ slugs, ...category }) => ({
  ...category,
  items: slugs.map((slug) => {
    const doc = DOCS[slug]
    if (!doc)
      throw new Error(`Category ${category.id} lists ${slug} but content/${slug}.tsx is missing`)
    return { slug: doc.slug, name: doc.name, when: doc.when, sibling: doc.sibling }
  }),
}))
