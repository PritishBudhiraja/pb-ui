"use client"

import { Command } from "cmdk"
import { Search } from "lucide-react"
import { type ReactNode, useEffect, useState } from "react"
import { cn } from "../lib/cn"

export interface CommandPaletteItem {
  id: string
  label: string
  group?: string
  href?: string
  keywords?: string
  icon?: ReactNode
}

export interface CommandPaletteProps {
  items: CommandPaletteItem[]
  onSelect: (item: CommandPaletteItem) => void
  placeholder?: string
  label?: string
  triggerLabel?: string
  shortcutHint?: string
  emptyText?: string
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({
  items,
  onSelect,
  placeholder = "Search…",
  label = "Command palette",
  triggerLabel = "Search",
  shortcutHint = "⌘K",
  emptyText = "No results.",
  className,
  open: openProp,
  onOpenChange,
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = openProp ?? uncontrolledOpen
  const setOpen = onOpenChange ?? setUncontrolledOpen

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  const groups = items.reduce<Record<string, CommandPaletteItem[]>>((acc, item) => {
    const key = item.group ?? "Items"
    acc[key] ??= []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
          className,
        )}
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{triggerLabel}</span>
        <kbd className="hidden rounded border border-border bg-muted px-1 font-sans text-[10px] sm:inline">
          {shortcutHint}
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={label}
        overlayClassName="fixed inset-0 z-[200] bg-background/70 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[15vh] z-[201] w-[min(100%-2rem,32rem)] -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
      >
        <Command.Input
          placeholder={placeholder}
          className="h-11 w-full border-b border-border bg-transparent px-3 text-sm outline-none"
        />
        <Command.List className="max-h-72 overflow-y-auto p-1">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
            {emptyText}
          </Command.Empty>
          {Object.entries(groups).map(([heading, groupItems]) => (
            <Command.Group
              key={heading}
              heading={heading}
              className="px-1 py-1 text-xs text-muted-foreground"
            >
              {groupItems.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.label} ${item.keywords ?? ""}`}
                  onSelect={() => {
                    setOpen(false)
                    onSelect(item)
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-muted"
                >
                  {item.icon}
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  )
}
