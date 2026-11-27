import { AreaChart } from "@pritish.budhiraja/ui/charts"
import { Preview } from "../ui/preview"
import { CHART } from "./shared"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "area-chart",
  name: "AreaChart",
  when: "Import from /charts.",
  title: "AreaChart",
  kicker: "Charts",
  description: "Optional /charts entry.",
  preview: (
    <Preview code={`import { AreaChart } from "@pritish.budhiraja/ui/charts"`}>
      <AreaChart className="h-48" data={CHART} series={[{ key: "value", label: "Hours" }]} />
    </Preview>
  ),
  a11y: "role=img.",
  props: [{ name: "data", type: "ChartDatum[]", description: "Points" }],
}
