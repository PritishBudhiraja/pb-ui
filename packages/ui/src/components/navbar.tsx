import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export function Navbar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "flex h-12 items-center gap-3 border-b border-border bg-background px-4 text-sm",
        className,
      )}
      {...props}
    />
  )
}

export function NavbarBrand({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-medium", className)} {...props} />
}

export function NavbarSpacer() {
  return <div className="flex-1" />
}
