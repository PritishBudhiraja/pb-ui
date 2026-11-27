import { InspectorPanel } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "inspector-panel",
  name: "InspectorPanel",
  when: "Titled third column.",
  title: "InspectorPanel",
  kicker: "Layout",
  description: "Titled surface for a third column.",
  preview: (
    <Preview code={`<InspectorPanel title="Detail">…</InspectorPanel>`}>
      <InspectorPanel title="Detail" className="w-56">
        Notes
      </InspectorPanel>
    </Preview>
  ),
  a11y: "Heading names the panel.",
  props: [{ name: "title", type: "string", description: "Heading" }],
}
