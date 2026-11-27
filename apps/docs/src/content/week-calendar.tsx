import { WeekCalendar } from "@pritish.budhiraja/ui"
import { useState } from "react"
import { Preview } from "../ui/preview"
import { EVENTS } from "./shared"
import type { ComponentDoc } from "./types"

function EditableWeekCalendarPreview() {
  const [events, setEvents] = useState(EVENTS)
  return (
    <WeekCalendar
      weekStart="2026-11-22"
      events={events}
      className="w-full"
      onEventChange={(id, next) =>
        setEvents((current) =>
          current.map((event) => (event.id === id ? { ...event, ...next } : event)),
        )
      }
    />
  )
}

export const doc: ComponentDoc = {
  slug: "week-calendar",
  name: "WeekCalendar",
  when: "Week of timed events with overlap packing.",
  title: "WeekCalendar",
  kicker: "Schedule",
  description:
    "Week columns × hour rows. Civil YYYY-MM-DDTHH:mm only. Overlaps pack into columns; events clip to visible hours and split across midnight. Host owns timezone and persistence.",
  preview: (
    <Preview
      code={`<WeekCalendar weekStart="2026-11-22" events={events} onEventChange={(id, next) => save(id, next)} />`}
    >
      <EditableWeekCalendarPreview />
    </Preview>
  ),
  a11y: "Events and optional empty slots are buttons. Arrow keys move, Shift+Arrow resizes when onEventChange is set.",
  related: [
    { slug: "time-grid", name: "TimeGrid" },
    { slug: "calendar-event", name: "CalendarEvent" },
  ],
  props: [
    { name: "events", type: "CalendarEventData[]", description: "Slots in the week" },
    { name: "onSlotSelect", type: "(slot) => void", description: "Empty hour cell" },
    {
      name: "onEventChange",
      type: "(id, next) => void",
      description: "Move or resize; host saves",
    },
  ],
}
