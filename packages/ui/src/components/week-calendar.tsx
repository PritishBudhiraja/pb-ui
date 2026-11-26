"use client"

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useState,
} from "react"
import { useFormatLocale } from "../hooks/use-hydrated"
import { cn } from "../lib/cn"
import { parseCivilDateTime, parseISODate, startOfWeek, toISODate, weekDays } from "../lib/date"
import {
  DEFAULT_SNAP_MINUTES,
  HOUR_HEIGHT_PX,
  layoutWeekEvents,
  nowIndicatorTop,
  resizeIntervalEnd,
  segmentStyle,
  shiftInterval,
  slotEnd,
  snapDelta,
  toNowCivil,
} from "../lib/week-event-layout"

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
  onSlotSelect?: (slot: { start: string; end: string }) => void
  onEventChange?: (id: string, next: { start: string; end: string }) => void
  showNow?: boolean
  now?: string
  className?: string
}

export type WeekCalendarProps = TimeGridProps

export interface CalendarEventProps extends CalendarEventData {
  onSelect?: (id: string) => void
  onEventChange?: (id: string, next: { start: string; end: string }) => void
  className?: string
  style?: CSSProperties
}

function eventName(label: string, start: string, end: string) {
  const parsedStart = parseCivilDateTime(start)
  const parsedEnd = parseCivilDateTime(end)
  if (!parsedStart || !parsedEnd) return label
  return `${label}, ${start.slice(11)}–${end.slice(11)}`
}

export function CalendarEvent({
  id,
  label,
  start,
  end,
  onSelect,
  onEventChange,
  className,
  style,
}: CalendarEventProps) {
  const [drag, setDrag] = useState<{ originY: number; mode: "move" | "resize" } | null>(null)

  useEffect(() => {
    if (!drag || !onEventChange) return
    const onMove = (event: globalThis.PointerEvent) => {
      const delta = snapDelta(event.clientY - drag.originY)
      if (delta === 0) return
      const next =
        drag.mode === "resize"
          ? resizeIntervalEnd(start, end, delta)
          : shiftInterval(start, end, delta)
      if (next) onEventChange(id, next)
    }
    const onUp = () => setDrag(null)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [drag, end, id, onEventChange, start])

  function move(delta: number) {
    const next = shiftInterval(start, end, delta)
    if (next) onEventChange?.(id, next)
  }

  function resize(delta: number) {
    const next = resizeIntervalEnd(start, end, delta)
    if (next) onEventChange?.(id, next)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!onEventChange) return
    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (event.shiftKey) resize(-DEFAULT_SNAP_MINUTES)
      else move(-DEFAULT_SNAP_MINUTES)
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (event.shiftKey) resize(DEFAULT_SNAP_MINUTES)
      else move(DEFAULT_SNAP_MINUTES)
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      move(-24 * 60)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      move(24 * 60)
    }
  }

  function begin(event: PointerEvent<HTMLButtonElement>, mode: "move" | "resize") {
    if (!onEventChange) return
    event.preventDefault()
    setDrag({ originY: event.clientY, mode })
  }

  return (
    <div className={cn("absolute px-0.5", className)} style={style}>
      <button
        type="button"
        className="flex h-full w-full items-start overflow-hidden rounded-sm border border-dashed border-border bg-foreground/10 px-1 py-0.5 text-left text-[11px] leading-tight font-normal hover:bg-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={eventName(label, start, end)}
        onClick={() => onSelect?.(id)}
        onPointerDown={(event) => begin(event, "move")}
        onKeyDown={onKeyDown}
      >
        {label}
      </button>
      {onEventChange ? (
        <button
          type="button"
          aria-label={`Resize ${label}`}
          className="absolute inset-x-1 bottom-0 h-2 cursor-ns-resize rounded-sm"
          onPointerDown={(event) => {
            event.stopPropagation()
            begin(event, "resize")
          }}
        />
      ) : null}
    </div>
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
  onSlotSelect,
  onEventChange,
  showNow = true,
  now,
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
  const slotFmt = new Intl.DateTimeFormat(formatLocale, {
    calendar: "gregory",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const clock = now ?? toNowCivil(new Date())
  const indicator = showNow ? nowIndicatorTop(clock, days, startHour, endHour) : undefined
  const segments = layoutWeekEvents(events, days, startHour, endHour)

  return (
    <div className={cn("max-w-full overflow-x-auto", className)}>
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
                className="border-t border-dashed border-border pr-1 text-right text-[11px] tabular-nums text-muted-foreground"
                style={{ height: HOUR_HEIGHT_PX }}
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
                gridTemplateRows: `repeat(${hours.length}, ${HOUR_HEIGHT_PX}px)`,
              }}
            >
              {hours.flatMap((hour) =>
                days.map((day) => {
                  const iso = toISODate(day)
                  const label = `${slotFmt.format(day)}, ${String(hour).padStart(2, "0")}:00`
                  if (!onSlotSelect) {
                    return (
                      <div
                        key={`${hour}-${iso}`}
                        className="border-t border-l border-dashed border-border"
                      />
                    )
                  }
                  return (
                    <button
                      key={`${hour}-${iso}`}
                      type="button"
                      aria-label={label}
                      className="border-t border-l border-dashed border-border hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() =>
                        onSlotSelect({
                          start: `${iso}T${String(hour).padStart(2, "0")}:00`,
                          end: slotEnd(iso, hour),
                        })
                      }
                    />
                  )
                }),
              )}
            </div>
            {indicator ? (
              <div
                data-now
                aria-hidden
                className="pointer-events-none absolute z-10 h-px bg-foreground"
                style={{
                  top: indicator.top,
                  left: `${(indicator.dayIndex / days.length) * 100}%`,
                  width: `${100 / days.length}%`,
                }}
              />
            ) : null}
            {segments.map((segment) => (
              <CalendarEvent
                key={`${segment.id}-${segment.dayIndex}-${segment.startMin}`}
                id={segment.id}
                label={segment.label}
                start={segment.start}
                end={segment.end}
                onSelect={onEventSelect}
                onEventChange={onEventChange}
                style={segmentStyle(segment, days.length, totalMinutes)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WeekCalendar(props: WeekCalendarProps) {
  return <TimeGrid {...props} />
}
