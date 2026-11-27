import type { ReactNode } from "react"

export interface CatalogEntry {
  slug: string
  name: string
  when: string
  sibling?: string
}

export interface CatalogCategory {
  id: string
  title: string
  purpose: string
  items: CatalogEntry[]
}

export interface ComponentDoc extends CatalogEntry {
  title: string
  kicker: string
  description: string
  preview: ReactNode
  code?: string
  a11y: string
  why?: string
  whenNot?: string
  related?: Array<{ slug: string; name: string }>
  props: Array<{ name: string; type: string; defaultValue?: string; description: string }>
}
