import { Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useControlledState } from "../hooks/use-controlled-state"
import { useFormFieldControl } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"
import {
  currentTime,
  displayTime,
  formatTime,
  fromClockParts,
  parseTime,
  toClockParts,
} from "../lib/time"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface TimePickerProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  minuteStep?: 1 | 5 | 10 | 15
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  "aria-label"?: string
}

export function TimePicker({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Pick a time",
  minuteStep = 5,
  disabled,
  className,
  id,
  name,
  "aria-label": ariaLabel,
}: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const field = useFormFieldControl({ id })
  const [selected, setSelected] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const parsed = parseTime(selected) ?? currentTime(minuteStep)
  const clock = toClockParts(parsed.hours, parsed.minutes)
  const [hour12, setHour12] = useState(clock.hour12)
  const [minutes, setMinutes] = useState(clock.minutes)
  const [period, setPeriod] = useState<"AM" | "PM">(clock.period)

  useEffect(() => {
    if (!open) return
    const next = parseTime(selected) ?? currentTime(minuteStep)
    const parts = toClockParts(next.hours, next.minutes)
    setHour12(parts.hour12)
    setMinutes(parts.minutes)
    setPeriod(parts.period)
  }, [open, selected, minuteStep])

  const hourValues = Array.from({ length: 12 }, (_, index) => index + 1)
  const minuteValues = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, index) => index * minuteStep,
  )
  const shown = selected ? displayTime(selected) : ""

  const commit = (
    nextHour12: number,
    nextMinutes: number,
    nextPeriod: "AM" | "PM",
    close = false,
  ) => {
    setHour12(nextHour12)
    setMinutes(nextMinutes)
    setPeriod(nextPeriod)
    const next = fromClockParts(nextHour12, nextMinutes, nextPeriod)
    setSelected(formatTime(next.hours, next.minutes))
    if (close) setOpen(false)
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...field}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(
              "w-full justify-between font-normal tabular-nums",
              !shown && "text-muted-foreground",
              className,
            )}
          >
            {shown || placeholder}
            <Clock className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          avoidCollisions={false}
          className="w-auto border-dashed p-3"
        >
          <div className="grid w-[16.5rem] grid-cols-3 gap-1">
            <TimeColumn
              label="Hour"
              values={hourValues}
              value={hour12}
              format={(item) => String(item)}
              onChange={(next) => commit(next, minutes, period)}
            />
            <TimeColumn
              label="Min"
              values={minuteValues}
              value={minutes}
              format={(item) => String(item).padStart(2, "0")}
              onChange={(next) => commit(hour12, next, period, true)}
            />
            <div className="min-w-0">
              <p className="mb-1 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Period
              </p>
              <div
                role="listbox"
                aria-label="Period"
                className="flex h-44 flex-col items-center justify-center gap-1"
              >
                {(["AM", "PM"] as const).map((item) => {
                  const selected = item === period
                  return (
                    <button
                      key={item}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cn(
                        "flex h-8 w-10 items-center justify-center rounded-md text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                      onClick={() => commit(hour12, minutes, item)}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between border-t border-dashed border-border pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelected("")
                setOpen(false)
              }}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const parsedNow = currentTime(minuteStep)
                const parts = toClockParts(parsedNow.hours, parsedNow.minutes)
                commit(parts.hour12, parts.minutes, parts.period, true)
              }}
            >
              Now
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {name ? <input type="hidden" name={name} value={selected} /> : null}
    </>
  )
}

function TimeColumn({
  label,
  values,
  value,
  format,
  onChange,
}: {
  label: string
  values: number[]
  value: number
  format: (value: number) => string
  onChange: (value: number) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: value moves the active option
  useEffect(() => {
    const active = activeRef.current
    const root = listRef.current
    /* v8 ignore start */
    if (!active || !root) return
    /* v8 ignore stop */
    root.scrollTop = active.offsetTop - root.clientHeight / 2 + active.offsetHeight / 2
  }, [value])

  return (
    <div className="min-w-0">
      <p className="mb-1 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div
        ref={listRef}
        role="listbox"
        aria-label={label}
        className="pb-scroll h-44 overflow-y-auto overscroll-contain"
      >
        <div className="h-16 shrink-0" aria-hidden />
        {values.map((item) => {
          const selected = item === value
          return (
            <button
              key={item}
              ref={selected ? activeRef : undefined}
              type="button"
              role="option"
              aria-selected={selected}
              className={cn(
                "mx-auto flex h-8 w-10 items-center justify-center rounded-md text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={() => onChange(item)}
            >
              {format(item)}
            </button>
          )
        })}
        <div className="h-16 shrink-0" aria-hidden />
      </div>
    </div>
  )
}
