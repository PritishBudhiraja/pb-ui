import { WeekCalendar } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import { EVENTS } from "./shared"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "calendar-event",
  name: "CalendarEvent",
  when: "Event chip in the grid.",
  title: "CalendarEvent",
  kicker: "Schedule",
  description: "Event chip used inside TimeGrid.",
  preview: (
    <Preview code={`<WeekCalendar … />`}>
      <WeekCalendar weekStart="2026-11-22" events={EVENTS} />
    </Preview>
  ),
  a11y: "Button.",
  props: [{ name: "label", type: "string", description: "Visible title" }],
}
