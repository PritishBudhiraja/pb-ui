"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useControlledState } from "../../hooks/use-controlled-state"
import { useFormFieldControl } from "../../hooks/use-form-field-control"
import { useFormatLocale } from "../../hooks/use-hydrated"
import { cn } from "../../lib/cn"
import { parseISODate, startOfMonth } from "../../lib/date"
import { Button } from "../actions/button"
import { Popover, PopoverContent, PopoverTrigger } from "../overlays/popover"
import { Calendar, type CalendarProps, type DateRangeValue } from "./calendar"

export type { DateRangeValue }

export interface DateRangePickerProps {
  value?: DateRangeValue
  defaultValue?: DateRangeValue
  onValueChange?: (value: DateRangeValue) => void
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
  className?: string
  id?: string
  locale?: string
  weekStartsOn?: CalendarProps["weekStartsOn"]
  "aria-label"?: string
}

function formatRange(range: DateRangeValue, locale?: string) {
  const from = parseISODate(range.from ?? "")
  const to = parseISODate(range.to ?? "")
  const fmt = new Intl.DateTimeFormat(locale, {
    calendar: "gregory",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  if (from && to) return `${fmt.format(from)} – ${fmt.format(to)}`
  if (from) return fmt.format(from)
  return ""
}

export function DateRangePicker({
  value,
  defaultValue = {},
  onValueChange,
  placeholder = "Pick a range",
  min,
  max,
  disabled,
  className,
  id,
  locale,
  weekStartsOn,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const formatLocale = useFormatLocale(locale)
  const [open, setOpen] = useState(false)
  const field = useFormFieldControl({ id })
  const [selected, setSelected] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const fromDate = parseISODate(selected.from ?? "")
  const [month, setMonth] = useState(() => startOfMonth(fromDate ?? new Date()))
  const display = formatRange(selected, formatLocale)

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) return
        setMonth(startOfMonth(parseISODate(selected.from ?? "") ?? new Date()))
      }}
    >
      <PopoverTrigger asChild>
        <Button
          {...field}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            "w-full justify-between font-normal tabular-nums",
            !display && "text-muted-foreground",
            className,
          )}
        >
          {display || placeholder}
          <CalendarIcon className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label={ariaLabel ?? placeholder}
        className="w-auto border-dashed p-3"
      >
        <Calendar
          mode="range"
          month={month}
          onMonthChange={setMonth}
          range={selected}
          min={min}
          max={max}
          locale={locale}
          weekStartsOn={weekStartsOn}
          onSelect={() => {}}
          onRangeChange={setSelected}
        />
        <div className="mt-2 flex justify-end border-t border-dashed border-border pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelected({})
              setOpen(false)
            }}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
