import { SearchInput } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "search-input",
  name: "SearchInput",
  when: "Filter or command search.",
  title: "SearchInput",
  kicker: "Form",
  description: "type=search with a leading icon.",
  preview: (
    <Preview code={`<SearchInput placeholder="Search" />`}>
      <SearchInput className="w-72" placeholder="Search" />
    </Preview>
  ),
  a11y: "Native search input. Pair with a visible Label or aria-label.",
  props: [{ name: "...", type: "InputProps", description: "Native input attributes" }],
}
