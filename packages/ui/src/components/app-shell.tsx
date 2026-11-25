import type { ReactNode } from "react"
import { cn } from "../lib/cn"

export function AppShell({
  header,
  sidebar,
  children,
  className,
}: {
  header?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-h-64 flex-col border border-border bg-background", className)}>
      {header}
      <div className="flex min-h-0 flex-1">
        {sidebar}
        <main className="min-w-0 flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
