import { Button, FilterBar, SearchInput } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "filter-bar",
  name: "FilterBar",
  when: "Row of filters above a table.",
  title: "FilterBar",
  kicker: "Pattern",
  description: "Dashed toolbar for search and filters. Compose controls inside.",
  preview: (
    <Preview code={`<FilterBar><SearchInput /></FilterBar>`}>
      <FilterBar className="w-full">
        <SearchInput className="w-48" placeholder="Filter" aria-label="Filter" />
        <Button size="sm">Apply</Button>
      </FilterBar>
    </Preview>
  ),
  a11y: "A div. Put labels on the controls inside.",
  props: [{ name: "children", type: "ReactNode", description: "Controls" }],
}
