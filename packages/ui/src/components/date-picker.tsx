"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useControlledState } from "../hooks/use-controlled-state"
import { useFormFieldControl } from "../hooks/use-form-field-control"
import { useFormatLocale } from "../hooks/use-hydrated"
import { cn } from "../lib/cn"
import { parseISODate, startOfMonth, toISODate } from "../lib/date"
import { Button } from "./button"
import { Calendar, type CalendarProps } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DatePickerProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  locale?: string
  weekStartsOn?: CalendarProps["weekStartsOn"]
  "aria-label"?: string
}

export function DatePicker({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Pick a date",
  min,
  max,
  disabled,
  className,
  id,
  name,
  locale,
  weekStartsOn,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const formatLocale = useFormatLocale(locale)
  const [open, setOpen] = useState(false)
  const field = useFormFieldControl({ id })
  const [selected, setSelected] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const selectedDate = parseISODate(selected)
  const todayIso = toISODate(new Date())
  const todayOutOfRange = Boolean((min && todayIso < min) || (max && todayIso > max))
  const [month, setMonth] = useState(() => startOfMonth(selectedDate ?? new Date()))

  const display = selectedDate
    ? new Intl.DateTimeFormat(formatLocale, {
        calendar: "gregory",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(selectedDate)
    : ""

  return (
    <>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) return
          setMonth(startOfMonth(parseISODate(selected) ?? new Date()))
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
            month={month}
            onMonthChange={setMonth}
            value={selected || undefined}
            min={min}
            max={max}
            locale={locale}
            weekStartsOn={weekStartsOn}
            onSelect={(iso) => {
              setSelected(iso)
              setOpen(false)
            }}
          />
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
              disabled={todayOutOfRange}
              onClick={() => {
                setSelected(todayIso)
                setMonth(startOfMonth(new Date()))
                setOpen(false)
              }}
            >
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {name ? <input type="hidden" name={name} value={selected} disabled={disabled} /> : null}
    </>
  )
}
