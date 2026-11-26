"use client"

import { useControlledState } from "../hooks/use-controlled-state"
import { useFormFieldControl } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"
import { formatIsoDuration } from "../lib/time"
import { Label } from "./label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Text } from "./text"

export interface DurationPickerProps {
  value?: number
  defaultValue?: number
  onValueChange?: (minutes: number) => void
  maxHours?: number
  minuteStep?: 1 | 5 | 10 | 15
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

export function DurationPicker({
  value,
  defaultValue = 30,
  onValueChange,
  maxHours = 12,
  minuteStep = 15,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: DurationPickerProps) {
  const field = useFormFieldControl({ id })
  const [minutes, setMinutes] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const hourOptions = Array.from({ length: maxHours + 1 }, (_, index) => index)
  const minuteOptions = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, index) => index * minuteStep,
  )
  const shownMinutes = minuteOptions.includes(rest)
    ? minuteOptions
    : [...minuteOptions, rest].sort((a, b) => a - b)
  const hoursId = field.id ? `${field.id}-hours` : undefined
  const minutesId = field.id ? `${field.id}-minutes` : undefined

  return (
    <fieldset
      className={cn("m-0 flex min-w-0 items-end gap-2 border-0 p-0", className)}
      aria-label={ariaLabel ?? "Duration"}
    >
      <div className="grid gap-1">
        <Label htmlFor={hoursId}>Hours</Label>
        <Select
          value={String(hours)}
          disabled={disabled}
          onValueChange={(next) => setMinutes(Number(next) * 60 + rest)}
        >
          <SelectTrigger id={hoursId} className="w-24" aria-label="Hours">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {hourOptions.map((hour) => (
              <SelectItem key={hour} value={String(hour)}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1">
        <Label htmlFor={minutesId}>Minutes</Label>
        <Select
          value={String(rest)}
          disabled={disabled}
          onValueChange={(next) => setMinutes(hours * 60 + Number(next))}
        >
          <SelectTrigger id={minutesId} className="w-24" aria-label="Minutes">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shownMinutes.map((item) => (
              <SelectItem key={item} value={String(item)}>
                {String(item).padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Text tone="muted" className="pb-2 text-xs tabular-nums">
        {formatIsoDuration(minutes)}
      </Text>
    </fieldset>
  )
}
