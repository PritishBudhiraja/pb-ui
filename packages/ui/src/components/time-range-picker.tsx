"use client"

import { useControlledState } from "../hooks/use-controlled-state"
import { cn } from "../lib/cn"
import { timeToMinutes } from "../lib/time"
import { TimePicker, type TimePickerProps } from "./time-picker"

export interface TimeRangeValue {
  start: string
  end: string
}

export interface TimeRangePickerProps {
  value?: TimeRangeValue
  defaultValue?: TimeRangeValue
  onValueChange?: (value: TimeRangeValue) => void
  startLabel?: string
  endLabel?: string
  minuteStep?: TimePickerProps["minuteStep"]
  disabled?: boolean
  className?: string
  locale?: string
}

export function isValidTimeRange(range: TimeRangeValue) {
  if (!range.start || !range.end) return true
  const start = timeToMinutes(range.start)
  const end = timeToMinutes(range.end)
  if (start === undefined || end === undefined) return false
  return end > start
}

export function TimeRangePicker({
  value,
  defaultValue = { start: "", end: "" },
  onValueChange,
  startLabel = "Start",
  endLabel = "End",
  minuteStep,
  disabled,
  className,
  locale,
}: TimeRangePickerProps) {
  const [range, setRange] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const valid = isValidTimeRange(range)

  return (
    <fieldset
      className={cn("m-0 flex min-w-0 flex-wrap items-start gap-3 border-0 p-0", className)}
    >
      <TimePicker
        aria-label={startLabel}
        value={range.start}
        minuteStep={minuteStep}
        disabled={disabled}
        locale={locale}
        placeholder={startLabel}
        onValueChange={(start) => setRange({ ...range, start })}
      />
      <TimePicker
        aria-label={endLabel}
        value={range.end}
        minuteStep={minuteStep}
        disabled={disabled}
        locale={locale}
        placeholder={endLabel}
        className={valid ? undefined : "border-destructive"}
        onValueChange={(end) => setRange({ ...range, end })}
      />
      {valid ? null : <p className="w-full text-xs text-destructive">End must be after start.</p>}
    </fieldset>
  )
}
