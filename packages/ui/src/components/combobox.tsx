import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { cn } from "../lib/cn"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface ComboboxItem {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  items: ComboboxItem[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}

export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No matches",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const selected = items.find((item) => item.value === value)
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", className)}
        >
          {selected?.label ?? placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1" align="start">
        <input
          className="mb-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={searchPlaceholder}
        />
        <ul className="max-h-56 overflow-auto">
          {filtered.length === 0 ? (
            <li className="px-2 py-3 text-sm text-muted-foreground">{emptyText}</li>
          ) : (
            filtered.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent disabled:opacity-50",
                    item.value === value && "bg-accent",
                  )}
                  onClick={() => {
                    onValueChange?.(item.value)
                    setOpen(false)
                    setQuery("")
                  }}
                >
                  {item.label}
                  {item.value === value ? <Check className="h-4 w-4" /> : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
