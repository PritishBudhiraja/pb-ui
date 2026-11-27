import { Pagination, PaginationNext, PaginationPrevious } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "pagination",
  name: "Pagination",
  when: "Paged lists.",
  title: "Pagination",
  kicker: "Navigation",
  description: "Prev/next controls. Compose page numbers with PaginationButton.",
  preview: (
    <Preview code={`<Pagination><PaginationPrevious /><PaginationNext /></Pagination>`}>
      <Pagination>
        <PaginationPrevious />
        <PaginationNext />
      </Pagination>
    </Preview>
  ),
  a11y: "nav labelled Pagination. current sets aria-current=page.",
  props: [{ name: "current", type: "boolean", description: "On PaginationButton" }],
}
