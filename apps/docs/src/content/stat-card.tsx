import { StatCard } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "stat-card",
  name: "StatCard",
  when: "Single metric.",
  title: "StatCard",
  kicker: "Data",
  description: "Label, value, optional hint on Card.",
  preview: (
    <Preview code={`<StatCard label="Components" value="40+" />`}>
      <StatCard label="Components" value="40+" hint="First pass plus catalogue" />
    </Preview>
  ),
  a11y: "Description then title. Not a live region.",
  props: [{ name: "value", type: "string", description: "Primary figure" }],
}
