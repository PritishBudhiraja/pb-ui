import * as React from "react"
import { cn } from "../lib/cn"

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, dashed = true, ...props }, ref) => {
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
  },
)
Surface.displayName = "Surface"
