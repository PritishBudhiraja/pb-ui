import { cn } from "../../lib/cn"

export const HEATMAP_LEVELS = [0, 1, 2, 3, 4] as const
export type HeatmapLevel = (typeof HEATMAP_LEVELS)[number]

export interface HeatmapDay {
  date: string
  count: number
  level: HeatmapLevel
}

export interface CalendarHeatmapProps {
  days: HeatmapDay[]
  from?: string
  to?: string
  total?: number
  className?: string
  getDayLabel?: (day: HeatmapDay) => string
}

const LEVEL_CLASS = [
  "bg-foreground/10",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/70",
  "bg-foreground",
] as const

export function toHeatmapLevel(value: number): HeatmapLevel {
  const clamped = Math.min(HEATMAP_LEVELS.length - 1, Math.max(0, Math.trunc(value)))
  return HEATMAP_LEVELS[clamped] as HeatmapLevel
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function weeksFromDays(days: HeatmapDay[]) {
  if (days.length === 0) return []

  const byDate = new Map(days.map((day) => [day.date, day]))
  const sorted = [...byDate.keys()].sort()
  const first = new Date(`${sorted[0]}T00:00:00Z`)
  const last = new Date(`${sorted[sorted.length - 1]}T00:00:00Z`)
  if (Number.isNaN(first.getTime()) || Number.isNaN(last.getTime())) return []

  const weeks: Array<Array<HeatmapDay | null>> = []
  let week: Array<HeatmapDay | null> = []

  for (let i = 0; i < first.getUTCDay(); i++) week.push(null)

  for (let cursor = new Date(first); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const iso = cursor.toISOString().slice(0, 10)
    week.push(byDate.get(iso) ?? { date: iso, count: 0, level: 0 })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

export function monthLabels(weeks: Array<Array<HeatmapDay | null>>) {
  const labels: Array<{ index: number; label: string }> = []
  let last = -1
  weeks.forEach((week, index) => {
    const day = week.find(Boolean)
    if (!day) return
    const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth()
    if (month !== last) {
      labels.push({ index, label: MONTHS[month] ?? "Jan" })
      last = month
    }
  })
  return labels
}

function defaultLabel(day: HeatmapDay) {
  return `${day.count} on ${day.date}`
}

export function CalendarHeatmap({
  days,
  from,
  to,
  total,
  className,
  getDayLabel = defaultLabel,
}: CalendarHeatmapProps) {
  const weeks = weeksFromDays(days)
  const labels = monthLabels(weeks)
  const computedTotal = total ?? days.reduce((sum, day) => sum + day.count, 0)
  const summary = `${computedTotal} total${from && to ? `, ${from} to ${to}` : ""}`

  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      <p className="sr-only">{summary}</p>
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-max">
          <div className="relative mb-1 h-4 text-[10px]" aria-hidden>
            {labels.map((item) => (
              <span
                key={`${item.label}-${item.index}`}
                className="absolute"
                style={{ left: `${(item.index / Math.max(weeks.length, 1)) * 100}%` }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="flex gap-0.5" role="img" aria-label={summary}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    title={day ? getDayLabel(day) : undefined}
                    className={cn(
                      "h-2.5 w-2.5 rounded-[2px]",
                      day ? LEVEL_CLASS[day.level] : "bg-transparent",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p>
          {computedTotal.toLocaleString("en-US")}
          {from && to ? `, ${from} – ${to}` : null}
        </p>
        <p className="flex items-center gap-1" aria-hidden>
          Less
          {LEVEL_CLASS.map((cls) => (
            <span key={cls} className={cn("h-2.5 w-2.5 rounded-[2px]", cls)} />
          ))}
          More
        </p>
      </div>
    </div>
  )
}
