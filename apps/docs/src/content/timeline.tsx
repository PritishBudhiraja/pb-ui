import { Timeline, TimelineItem } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "timeline",
  name: "Timeline",
  when: "Dated events.",
  title: "Timeline",
  kicker: "Data",
  description: "Vertical list with a rail.",
  preview: (
    <Preview code={`<Timeline><TimelineItem title="Shipped" /></Timeline>`}>
      <Timeline className="w-full">
        <TimelineItem title="Shipped" meta="0.1.0">
          Tokens and primitives
        </TimelineItem>
      </Timeline>
    </Preview>
  ),
  a11y: "A list. Title is visible text.",
  props: [{ name: "title", type: "string", description: "Item heading" }],
}
