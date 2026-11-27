import { WeekCalendar } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import { EVENTS } from "./shared"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "time-grid",
  name: "TimeGrid",
  when: "Same grid as WeekCalendar.",
  title: "TimeGrid",
  kicker: "Schedule",
  description: "Same grid as WeekCalendar. Use either name.",
  preview: (
    <Preview code={`<WeekCalendar weekStart="2026-11-22" />`}>
      <WeekCalendar weekStart="2026-11-22" events={EVENTS} />
    </Preview>
  ),
  a11y: "Same as WeekCalendar.",
  props: [{ name: "weekStart", type: "string", description: "ISO date in the week" }],
}
