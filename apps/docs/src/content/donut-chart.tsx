import { DonutChart } from "@pritish.budhiraja/ui/charts"
import { Preview } from "../ui/preview"
import { CHART } from "./shared"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "donut-chart",
  name: "DonutChart",
  when: "Import from /charts.",
  title: "DonutChart",
  kicker: "Charts",
  description: "Optional /charts entry.",
  preview: (
    <Preview code={`import { DonutChart } from "@pritish.budhiraja/ui/charts"`}>
      <DonutChart className="h-48" data={CHART} />
    </Preview>
  ),
  a11y: "role=img.",
  props: [{ name: "dataKey", type: "string", defaultValue: "value", description: "Numeric key" }],
}
