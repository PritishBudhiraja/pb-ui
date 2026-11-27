import { WeeklyActivityGrid } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "weekly-activity-grid",
  name: "WeeklyActivityGrid",
  when: "Hour × day intensity.",
  title: "WeeklyActivityGrid",
  kicker: "Viz",
  description: "Hour × day intensity. Not CalendarHeatmap.",
  preview: (
    <Preview code={`<WeeklyActivityGrid cells={…} />`}>
      <WeeklyActivityGrid
        startHour={8}
        endHour={12}
        cells={[
          { day: 1, hour: 9, value: 4 },
          { day: 2, hour: 10, value: 2 },
        ]}
      />
    </Preview>
  ),
  a11y: "Text summary is visually hidden.",
  props: [{ name: "cells", type: "ActivityCell[]", description: "day 0–6, hour, value" }],
}
