import { Grid, StatCard } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "grid",
  name: "Grid",
  when: "Equal columns.",
  title: "Grid",
  kicker: "Layout",
  description: "Responsive columns 1–4.",
  preview: (
    <Preview code={`<Grid columns={2}>…</Grid>`}>
      <Grid className="w-full" columns={2}>
        <StatCard label="A" value="1" />
        <StatCard label="B" value="2" />
      </Grid>
    </Preview>
  ),
  a11y: "Layout only.",
  props: [
    { name: "columns", type: "1 | 2 | 3 | 4", defaultValue: "2", description: "Column count" },
  ],
}
