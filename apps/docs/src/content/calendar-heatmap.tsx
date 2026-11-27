import { CalendarHeatmap, toHeatmapLevel } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "calendar-heatmap",
  name: "CalendarHeatmap",
  when: "Year of activity with a text summary.",
  sibling: "Not a date picker — use DatePicker for choosing a day.",
  title: "CalendarHeatmap",
  why: "Contribution-style year grid with a text summary so the data is not trapped in color.",
  whenNot: "Not a DatePicker. Missing days should be empty, not guessed.",
  related: [{ slug: "date-picker", name: "DatePicker" }],
  kicker: "Signature",
  description:
    "Generic contribution-style grid. Missing dates between first and last are filled. No GitHub fetch.",
  preview: (
    <Preview code={`<CalendarHeatmap days={days} from="2026-01-01" to="2026-01-14" />`}>
      <CalendarHeatmap
        className="w-full"
        days={Array.from({ length: 14 }, (_, i) => ({
          date: `2026-01-${String(i + 1).padStart(2, "0")}`,
          count: i % 4,
          level: toHeatmapLevel(i % 5),
        }))}
        from="2026-01-01"
        to="2026-01-14"
      />
    </Preview>
  ),
  code: "",
  a11y: "sr-only summary plus role=img on the grid. Prefer toHeatmapLevel() instead of asserting levels.",
  props: [
    { name: "days", type: "HeatmapDay[]", description: "Sparse or contiguous days" },
    { name: "getDayLabel", type: "(day) => string", description: "title text" },
  ],
}
