"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { type KeyboardEvent, useEffect, useRef, useState } from "react"
import { useFormatLocale, useHydrated } from "../../hooks/use-hydrated"
import { cn } from "../../lib/cn"
import {
  addDays,
  addMonths,
  calendarWeeks,
  isSameDay,
  startOfMonth,
  toISODate,
} from "../../lib/date"
import { IconButton } from "../actions/icon-button"

const ARROW_DAYS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
}

export interface DateRangeValue {
  from?: string
  to?: string
}

export interface CalendarProps {
  month: Date
  onMonthChange: (month: Date) => void
  value?: string
  range?: DateRangeValue
  mode?: "single" | "range"
  onSelect: (iso: string) => void
  onRangeChange?: (range: DateRangeValue) => void
  min?: string
  max?: string
  locale?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

// 2023-01-01 was a Sunday, so day n of that week has weekday n.
function weekdayNames(locale: string | undefined, weekStartsOn: number) {
  const narrow = new Intl.DateTimeFormat(locale, { weekday: "narrow" })
  const long = new Intl.DateTimeFormat(locale, { weekday: "long" })
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2023, 0, 1 + ((weekStartsOn + index) % 7))
    return { short: narrow.format(date), long: long.format(date) }
  })
}

function nextRange(current: DateRangeValue, iso: string): DateRangeValue {
  if (!current.from || (current.from && current.to)) return { from: iso, to: undefined }
  if (iso < current.from) return { from: iso, to: current.from }
  return { from: current.from, to: iso }
}

export function Calendar({
  month,
  onMonthChange,
  value,
  range,
  mode = "single",
  onSelect,
  onRangeChange,
  min,
  max,
  locale,
  weekStartsOn = 0,
  className,
}: CalendarProps) {
  const view = startOfMonth(month)
  const formatLocale = useFormatLocale(locale)
  // The server cannot know the viewer's date, so mark today only after hydration.
  const today = useHydrated() ? new Date() : null
  const weeks = calendarWeeks(view, weekStartsOn)
  const label = new Intl.DateTimeFormat(formatLocale, {
    calendar: "gregory",
    month: "long",
    year: "numeric",
  }).format(view)
  const dayLabel = new Intl.DateTimeFormat(formatLocale, { calendar: "gregory", dateStyle: "full" })
  const weekdays = weekdayNames(formatLocale, weekStartsOn)
  const gridRef = useRef<HTMLDivElement>(null)
  const [focusIso, setFocusIso] = useState<string | null>(null)
  const inView = (iso: string | undefined) => iso?.slice(0, 7) === toISODate(view).slice(0, 7)
  const rangeFrom = range?.from
  const rangeTo = range?.to
  const tabStop =
    [focusIso ?? undefined, value, rangeFrom, rangeTo, today ? toISODate(today) : undefined].find(
      inView,
    ) ?? toISODate(view)

  useEffect(() => {
    if (!focusIso) return
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${focusIso}"]`)?.focus()
  }, [focusIso])

  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const delta = ARROW_DAYS[event.key]
    if (delta === undefined) return
    event.preventDefault()
    const target = addDays(date, delta)
    if (target.getMonth() !== view.getMonth()) onMonthChange(startOfMonth(target))
    setFocusIso(toISODate(target))
  }

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
      <div ref={gridRef} className="grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((day) => (
          <span
            key={day.long}
            aria-hidden
            title={day.long}
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            {day.short}
          </span>
        ))}
        {weeks.flat().map((date) => {
          const iso = toISODate(date)
          const outside = date.getMonth() !== view.getMonth()
          const inRange =
            mode === "range" && !!rangeFrom && iso >= rangeFrom && iso <= (rangeTo ?? rangeFrom)
          const selected = mode === "range" ? iso === rangeFrom || iso === rangeTo : value === iso
          const isToday = today !== null && isSameDay(date, today)
          const disabled = Boolean((min && iso < min) || (max && iso > max))
          return (
            <button
              key={iso + (outside ? "-out" : "")}
              type="button"
              data-iso={outside ? undefined : iso}
              aria-label={dayLabel.format(date)}
              aria-pressed={selected || inRange}
              aria-current={isToday ? "date" : undefined}
              tabIndex={iso === tabStop && !outside ? 0 : -1}
              disabled={disabled}
              onClick={() => {
                onSelect(iso)
                if (mode === "range" && onRangeChange) onRangeChange(nextRange(range ?? {}, iso))
              }}
              onKeyDown={(event) => onDayKeyDown(event, date)}
              className={cn(
                "mx-auto flex h-8 w-8 items-center justify-center rounded-md text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
                outside && "text-muted-foreground/50",
                inRange && !selected && "bg-accent text-accent-foreground",
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
