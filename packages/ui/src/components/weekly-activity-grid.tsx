import { cn } from "../lib/cn"

export interface ActivityCell {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6
  hour: number
  value: number
}

export interface WeeklyActivityGridProps {
  cells: ActivityCell[]
  startHour?: number
  endHour?: number
  className?: string
  label?: string
  dayLabels?: string[]
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function tone(value: number) {
  if (value <= 0) return "bg-foreground/10"
  if (value < 2) return "bg-foreground/25"
  if (value < 4) return "bg-foreground/45"
  if (value < 6) return "bg-foreground/70"
  return "bg-foreground"
}

export function WeeklyActivityGrid({
  cells,
  startHour = 0,
  endHour = 24,
  className,
  label = "Weekly activity",
  dayLabels = DAYS,
}: WeeklyActivityGridProps) {
  const hours = Array.from(
    { length: Math.max(1, endHour - startHour) },
    (_, index) => startHour + index,
  )
  const lookup = new Map(cells.map((cell) => [`${cell.day}-${cell.hour}`, cell.value]))
  const total = cells.reduce((sum, cell) => sum + cell.value, 0)

  return (
    <div className={cn("overflow-x-auto", className)}>
      <p className="sr-only">
        {label}: {total} across the week
      </p>
      <div
        className="grid min-w-[20rem] gap-1"
        style={{ gridTemplateColumns: `2rem repeat(${hours.length}, minmax(0, 1fr))` }}
      >
        <div />
        {hours.map((hour) => (
          <div key={hour} className="text-center text-[10px] tabular-nums text-muted-foreground">
            {hour}
          </div>
        ))}
        {dayLabels.slice(0, 7).map((day, dayIndex) => (
          <DayRow
            key={dayIndex}
            day={day}
            dayIndex={dayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6}
            hours={hours}
            lookup={lookup}
          />
        ))}
      </div>
    </div>
  )
}

function DayRow({
  day,
  dayIndex,
  hours,
  lookup,
}: {
  day: string
  dayIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6
  hours: number[]
  lookup: Map<string, number>
}) {
  return (
    <>
      <div className="text-[11px] text-muted-foreground">{day}</div>
      {hours.map((hour) => {
        const value = lookup.get(`${dayIndex}-${hour}`) ?? 0
        return (
          <div
            key={`${dayIndex}-${hour}`}
            title={`${day} ${hour}:00 · ${value}`}
            className={cn("h-4 rounded-sm", tone(value))}
          >
            <span className="sr-only">
              {day} {hour}:00, {value}
            </span>
          </div>
        )
      })}
    </>
  )
}
