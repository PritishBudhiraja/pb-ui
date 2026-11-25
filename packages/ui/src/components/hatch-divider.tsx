import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export function HatchDivider({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("section-hatch", className)} aria-hidden {...props} />
}
