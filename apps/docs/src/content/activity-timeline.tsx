import { ActivityTimeline } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "activity-timeline",
  name: "ActivityTimeline",
  when: "Items on Timeline.",
  title: "ActivityTimeline",
  kicker: "Viz",
  description: "Items onto Timeline.",
  preview: (
    <Preview code={`<ActivityTimeline items={…} />`}>
      <ActivityTimeline items={[{ id: "1", title: "Shipped", meta: "today" }]} />
    </Preview>
  ),
  a11y: "List.",
  props: [{ name: "items", type: "ActivityItem[]", description: "Events" }],
}
