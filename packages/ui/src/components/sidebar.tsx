import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"

export function Sidebar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn(
        "flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-background p-3",
        className,
      )}
      {...props}
    />
  )
}

export function SidebarItem({
  current,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { current?: boolean }) {
  return (
    <button
      type="button"
      aria-current={current ? "page" : undefined}
      className={cn(
        "rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        current && "bg-accent font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1">
      {title ? <p className="px-2 text-xs font-medium text-muted-foreground">{title}</p> : null}
      {children}
    </div>
  )
}
