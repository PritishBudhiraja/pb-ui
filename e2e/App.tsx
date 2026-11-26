import { EditorialHeading, RichTextEditor, ThemeToggle, WeekCalendar } from "@pritish.budhiraja/ui"
import { useState } from "react"

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [events, setEvents] = useState([
    { id: "1", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Focus" },
  ])

  return (
    <div
      className={
        theme === "dark" ? "dark min-h-svh bg-background p-8" : "min-h-svh bg-background p-8"
      }
    >
      <EditorialHeading>Hatch e2e</EditorialHeading>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <RichTextEditor className="mt-4" placeholder="Write a note" value="" />
      <WeekCalendar
        className="mt-4"
        weekStart="2026-11-22"
        now="2026-11-23T12:00"
        events={events}
        onSlotSelect={(slot) =>
          setEvents((current) => [
            ...current,
            { id: String(current.length + 1), label: "Slot", ...slot },
          ])
        }
        onEventChange={(id, next) =>
          setEvents((current) =>
            current.map((item) => (item.id === id ? { ...item, ...next } : item)),
          )
        }
      />
    </div>
  )
}
