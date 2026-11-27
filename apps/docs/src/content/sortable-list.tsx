import { SortableList } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "sortable-list",
  name: "SortableList",
  when: "Reorder a list.",
  title: "SortableList",
  kicker: "List",
  description: "Drag and keyboard reorder. Up/down buttons always work.",
  preview: (
    <Preview code={`<SortableList defaultItems={[{ id: "a", label: "Alpha" }]} />`}>
      <SortableList
        className="w-72"
        defaultItems={[
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta" },
        ]}
      />
    </Preview>
  ),
  a11y: "Move up/down buttons. Drag handle is labelled.",
  props: [{ name: "onReorder", type: "(items) => void", description: "New order" }],
}
