import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/cn"
import { addMonths, calendarWeeks, isSameDay, startOfMonth, toISODate } from "../lib/date"
import { IconButton } from "./icon-button"

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

export interface CalendarProps {
  month: Date
  onMonthChange: (month: Date) => void
  value?: string
  onSelect: (iso: string) => void
  min?: string
  max?: string
  className?: string
}

export function Calendar({
  month,
  onMonthChange,
  value,
  onSelect,
  min,
  max,
  className,
}: CalendarProps) {
  const view = startOfMonth(month)
  const today = new Date()
  const weeks = calendarWeeks(view)
  const label = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(view)

  return (
    <div className={cn("w-[16.5rem]", className)}>
      <div className="mb-2 flex items-center justify-between">
        <IconButton
          variant="ghost"
          className="h-8 w-8"
          label="Previous month"
          onClick={() => onMonthChange(addMonths(view, -1))}
        >
          <ChevronLeft />
        </IconButton>
        <p className="text-sm font-medium">{label}</p>
        <IconButton
          variant="ghost"
          className="h-8 w-8"
          label="Next month"
          onClick={() => onMonthChange(addMonths(view, 1))}
        >
          <ChevronRight />
        </IconButton>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            {day}
          </span>
        ))}
        {weeks.flat().map((date) => {
          const iso = toISODate(date)
          const outside = date.getMonth() !== view.getMonth()
          const selected = value === iso
          const isToday = isSameDay(date, today)
          const disabled = Boolean((min && iso < min) || (max && iso > max))
          return (
            <button
              key={iso + (outside ? "-out" : "")}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={cn(
                "mx-auto flex h-8 w-8 items-center justify-center rounded-md text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
                outside && "text-muted-foreground/50",
                isToday && !selected && "border border-dashed border-border",
                selected && "bg-primary text-primary-foreground",
                !selected && !disabled && "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
