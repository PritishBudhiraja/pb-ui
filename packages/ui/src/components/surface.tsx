import type * as React from "react"
import { cn } from "../lib/cn"

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean
}

export function Surface({
  className,
  dashed = true,
  ref,
  ...props
}: SurfaceProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-card text-card-foreground",
        dashed ? "border border-dashed border-border" : "border border-border",
        className,
      )}
      {...props}
    />
  )
}
