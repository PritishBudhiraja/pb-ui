import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"

export function Timeline({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("grid gap-4 border-l border-border pl-4", className)} {...props} />
}

export function TimelineItem({
  title,
  meta,
  children,
}: {
  title: string
  meta?: string
  children?: ReactNode
}) {
  return (
    <li className="relative">
      <span className="absolute -left-[1.32rem] top-1.5 h-2 w-2 rounded-full bg-foreground" />
      <p className="text-sm font-medium">{title}</p>
      {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}
      {children ? <div className="mt-1 text-sm text-muted-foreground">{children}</div> : null}
    </li>
  )
}
