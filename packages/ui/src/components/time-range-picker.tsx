"use client"

import { useContext, useId } from "react"
import { useControlledState } from "../hooks/use-controlled-state"
import { FormFieldContext, useFormFieldGroup } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"
import { timeToMinutes } from "../lib/time"
import { FormError } from "./form-field"
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
  id?: string
  "aria-label"?: string
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
  id,
  "aria-label": ariaLabel,
}: TimeRangePickerProps) {
  const field = useContext(FormFieldContext)
  const group = useFormFieldGroup({ "aria-label": ariaLabel })
  const generatedId = useId()
  const [range, setRange] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const valid = isValidTimeRange(range)
  const base = id ?? field?.id ?? generatedId
  const errorId = `${base}-range-error`
  const labelId = field?.labelId ?? ""
  const fieldInvalid = field?.invalid ?? false
  // Each picker reads FormField context for its id, so give each its own.
  const startField = {
    id: `${base}-start`,
    labelId,
    describedBy: field?.describedBy,
    invalid: fieldInvalid,
  }
  const endField = {
    id: `${base}-end`,
    labelId,
    describedBy:
      [field?.describedBy, valid ? undefined : errorId].filter(Boolean).join(" ") || undefined,
    invalid: fieldInvalid || !valid,
  }

  return (
    <fieldset
      aria-label={group["aria-label"]}
      aria-labelledby={group["aria-labelledby"]}
      className={cn("m-0 flex min-w-0 flex-wrap items-start gap-3 border-0 p-0", className)}
    >
      <FormFieldContext.Provider value={startField}>
        <TimePicker
          aria-label={startLabel}
          value={range.start}
          minuteStep={minuteStep}
          disabled={disabled}
          locale={locale}
          placeholder={startLabel}
          onValueChange={(start) => setRange({ ...range, start })}
        />
      </FormFieldContext.Provider>
      <FormFieldContext.Provider value={endField}>
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
      </FormFieldContext.Provider>
      {valid ? null : (
        <FormError id={errorId} className="w-full">
          End must be after start.
        </FormError>
      )}
    </fieldset>
  )
}
