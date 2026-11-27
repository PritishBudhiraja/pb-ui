import { TimeAllocationBar } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "time-allocation-bar",
  name: "TimeAllocationBar",
  when: "Shares of a whole.",
  title: "TimeAllocationBar",
  kicker: "Viz",
  description: "Share of a whole. Semantic grayscale only.",
  preview: (
    <Preview code={`<TimeAllocationBar segments={…} />`}>
      <TimeAllocationBar
        className="w-full"
        segments={[
          { label: "Deep", value: 3 },
          { label: "Shallow", value: 1 },
        ]}
      />
    </Preview>
  ),
  a11y: "role=img plus a text legend.",
  props: [{ name: "segments", type: "{ label, value }[]", description: "Shares" }],
}
