import type { ComponentDoc } from "./types"

const loaders = import.meta.glob<ComponentDoc>(["./*.tsx", "!./shared.tsx"], { import: "doc" })

const cache = new Map<string, Promise<ComponentDoc | undefined>>()

// Cached so React's use() sees the same promise on every render.
export function loadDoc(slug: string) {
  let promise = cache.get(slug)
  if (!promise) {
    const load = loaders[`./${slug}.tsx`]
    promise = load ? load() : Promise.resolve(undefined)
    cache.set(slug, promise)
  }
  return promise
}

let all: Promise<Record<string, ComponentDoc>> | undefined

export function loadAllDocs() {
  all ??= Promise.all(Object.keys(loaders).map((path) => loaders[path]?.())).then((docs) =>
    Object.fromEntries(
      docs.filter((doc): doc is ComponentDoc => Boolean(doc)).map((doc) => [doc.slug, doc]),
    ),
  )
  return all
}
