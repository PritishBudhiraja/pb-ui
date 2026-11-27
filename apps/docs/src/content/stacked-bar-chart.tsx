import { StackedBarChart } from "@pritish.budhiraja/ui/charts"
import { Preview } from "../ui/preview"
import { CHART } from "./shared"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "stacked-bar-chart",
  name: "StackedBarChart",
  when: "Import from /charts.",
  title: "StackedBarChart",
  kicker: "Charts",
  description: "Import from @pritish.budhiraja/ui/charts. Semantic fills.",
  preview: (
    <Preview code={`import { StackedBarChart } from "@pritish.budhiraja/ui/charts"`}>
      <StackedBarChart
        className="h-48"
        data={CHART}
        series={[{ key: "deep" }, { key: "shallow" }]}
      />
    </Preview>
  ),
  a11y: "role=img with a label.",
  props: [{ name: "series", type: "ChartSeries[]", description: "Stacked keys" }],
}
