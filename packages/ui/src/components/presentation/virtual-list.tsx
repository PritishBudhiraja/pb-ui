"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { type ReactNode, useRef } from "react"
import { cn } from "../../lib/cn"

export interface VirtualListProps<T> {
  items: T[]
  estimateSize?: number
  height?: number
  getItemKey?: (item: T, index: number) => string | number
  renderItem: (item: T, index: number) => ReactNode
  className?: string
  label?: string
}

export function VirtualList<T>({
  items,
  estimateSize = 36,
  height = 240,
  getItemKey,
  renderItem,
  className,
  label = "List",
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLUListElement>(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    getItemKey: (index) => {
      const item = items[index]
      return item === undefined ? index : (getItemKey?.(item, index) ?? index)
    },
  })

  return (
    <ul
      ref={parentRef}
      aria-label={label}
      className={cn(
        "relative m-0 list-none overflow-auto border border-dashed border-border p-0",
        className,
      )}
      style={{ height }}
    >
      <li
        aria-hidden
        className="m-0 list-none p-0"
        style={{ height: virtualizer.getTotalSize() }}
      />
      {virtualizer.getVirtualItems().map((row) => {
        const item = items[row.index] as T
        return (
          <li
            key={row.key}
            aria-setsize={items.length}
            aria-posinset={row.index + 1}
            className="absolute left-0 top-0 m-0 w-full list-none p-0"
            style={{ height: row.size, transform: `translateY(${row.start}px)` }}
          >
            {renderItem(item, row.index)}
          </li>
        )
      })}
    </ul>
  )
}
