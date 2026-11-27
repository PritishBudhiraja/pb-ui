"use client"

import { Command } from "cmdk"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { useControlledState } from "../../hooks/use-controlled-state"
import { useFormFieldControl } from "../../hooks/use-form-field-control"
import { cn } from "../../lib/cn"
import { Button } from "../actions/button"
import { Popover, PopoverContent, PopoverTrigger } from "../overlays/popover"

export interface ComboboxItem {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  items: ComboboxItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

export function Combobox({
  items,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No matches",
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = useControlledState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const field = useFormFieldControl({ id })
  const current = items.find((item) => item.value === selected)
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setQuery("")
      }}
    >
      <PopoverTrigger asChild>
        <Button
          {...field}
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            "w-full justify-between font-normal",
            !current && "text-muted-foreground",
            className,
          )}
        >
          {current?.label ?? placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={ariaLabel ?? placeholder}
        className="w-[var(--radix-popover-trigger-width)] p-1"
        align="start"
      >
        <Command shouldFilter={false} label={searchPlaceholder} defaultValue={selected}>
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder={searchPlaceholder}
            className="mb-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Command.Empty aria-hidden className="px-2 py-3 text-sm text-muted-foreground">
            {emptyText}
          </Command.Empty>
          <p role="status" className="sr-only">
            {filtered.length === 0 ? emptyText : ""}
          </p>
          <Command.List className="max-h-56 overflow-auto">
            {filtered.map((item) => (
              <Command.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                aria-checked={item.value === selected}
                onSelect={() => {
                  setSelected(item.value)
                  setOpen(false)
                  setQuery("")
                }}
                className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent"
              >
                {item.label}
                {item.value === selected ? <Check className="h-4 w-4" /> : null}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
