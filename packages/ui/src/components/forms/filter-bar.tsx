import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export function FilterBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-3 rounded-md border border-dashed border-border p-3",
        className,
      )}
      {...props}
    />
  )
}
