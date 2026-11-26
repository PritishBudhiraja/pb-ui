"use client"

import type { CSSProperties } from "react"
import { useFormatLocale } from "../hooks/use-hydrated"
import { cn } from "../lib/cn"
import { parseCivilDateTime, parseISODate, startOfWeek, toISODate, weekDays } from "../lib/date"
import { Button } from "./button"

export interface CalendarEventData {
  id: string
  start: string
  end: string
  label: string
}

export interface TimeGridProps {
  weekStart: string
  events?: CalendarEventData[]
  startHour?: number
  endHour?: number
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  onEventSelect?: (id: string) => void
  className?: string
}

export type WeekCalendarProps = TimeGridProps

export interface CalendarEventProps extends CalendarEventData {
  onSelect?: (id: string) => void
  className?: string
  style?: CSSProperties
}

function eventLayout(
  event: CalendarEventData,
  days: Date[],
  startHour: number,
  totalMinutes: number,
) {
  const start = parseCivilDateTime(event.start)
  const end = parseCivilDateTime(event.end)
  if (!start || !end) return null
  const dayIndex = days.findIndex((day) => toISODate(day) === start.isoDate)
  if (dayIndex < 0) return null
  const startMin = start.hours * 60 + start.minutes - startHour * 60
  const endMin = end.hours * 60 + end.minutes - startHour * 60
  return {
    dayIndex,
    top: `${Math.max(0, (startMin / totalMinutes) * 100)}%`,
    height: `${Math.max(3, ((endMin - startMin) / totalMinutes) * 100)}%`,
    left: `${(dayIndex / days.length) * 100}%`,
    width: `${100 / days.length}%`,
  }
}

export function CalendarEvent({
  id,
  label,
  start,
  end,
  onSelect,
  className,
  style,
}: CalendarEventProps) {
  const title = `${label}, ${start.slice(11)}–${end.slice(11)}`
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      style={style}
      className={cn(
        "h-auto justify-start overflow-hidden rounded-sm border border-dashed border-border bg-foreground/10 px-1 py-0.5 text-left text-[11px] leading-tight font-normal",
        className,
      )}
      aria-label={title}
      onClick={() => onSelect?.(id)}
    >
      {label}
    </Button>
  )
}

export function TimeGrid({
  weekStart,
  events = [],
  startHour = 8,
  endHour = 18,
  weekStartsOn = 0,
  locale,
  onEventSelect,
  className,
}: TimeGridProps) {
  const formatLocale = useFormatLocale(locale)
  const startDate = parseISODate(weekStart) ?? new Date()
  const start = startOfWeek(startDate, weekStartsOn)
  const days = weekDays(start)
  const hours = Array.from(
    { length: Math.max(1, endHour - startHour) },
    (_, index) => startHour + index,
  )
  const totalMinutes = hours.length * 60
  const dayFmt = new Intl.DateTimeFormat(formatLocale, {
    calendar: "gregory",
    weekday: "short",
    day: "numeric",
  })

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[40rem]">
        <div
          className="grid"
          style={{ gridTemplateColumns: `3rem repeat(${days.length}, minmax(0, 1fr))` }}
        >
          <div />
          {days.map((day) => (
            <div
              key={toISODate(day)}
              className="border-b border-dashed border-border px-1 py-1 text-center text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {dayFmt.format(day)}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="w-12 shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 border-t border-dashed border-border pr-1 text-right text-[11px] tabular-nums text-muted-foreground"
              >
                {String(hour).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <div
              className="grid h-full"
              style={{
                gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${hours.length}, 3rem)`,
              }}
            >
              {hours.flatMap((hour) =>
                days.map((day) => (
                  <div
                    key={`${hour}-${toISODate(day)}`}
                    className="border-t border-l border-dashed border-border"
                  />
                )),
              )}
            </div>
            {events.map((event) => {
              const layout = eventLayout(event, days, startHour, totalMinutes)
              if (!layout) return null
              return (
                <CalendarEvent
                  key={event.id}
                  {...event}
                  onSelect={onEventSelect}
                  className="absolute px-1"
                  style={{
                    top: layout.top,
                    height: layout.height,
                    left: layout.left,
                    width: layout.width,
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WeekCalendar(props: WeekCalendarProps) {
  return <TimeGrid {...props} />
}
