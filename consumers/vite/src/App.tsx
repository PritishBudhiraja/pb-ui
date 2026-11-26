import {
  Button,
  EditorialHeading,
  MarkdownRenderer,
  ThemeToggle,
  WeekCalendar,
} from "@pritish.budhiraja/ui"
import { AreaChart } from "@pritish.budhiraja/ui/charts"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { useState } from "react"

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div
      className={
        theme === "dark" ? "dark min-h-svh bg-background p-8" : "min-h-svh bg-background p-8"
      }
    >
      <EditorialHeading>Hatch published consumer</EditorialHeading>
      <div className="mt-4 flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Button>Quiet</Button>
        <OriginButton>Origin</OriginButton>
      </div>
      <MarkdownRenderer className="mt-6" markdown="Hello **Hatch**." />
      <div className="mt-6 h-48">
        <AreaChart
          data={[
            { name: "Mon", value: 3 },
            { name: "Tue", value: 2 },
          ]}
          series={[{ key: "value", label: "Hours" }]}
        />
      </div>
      <WeekCalendar
        className="mt-6"
        weekStart="2026-11-22"
        now="2026-11-23T12:00"
        events={[{ id: "1", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Focus" }]}
      />
    </div>
  )
}
