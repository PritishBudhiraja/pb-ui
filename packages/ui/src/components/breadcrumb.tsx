import { Slot } from "@radix-ui/react-slot"
import { ChevronRight } from "lucide-react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "../lib/cn"

export function Breadcrumb({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("text-sm", className)} {...props} />
}

export function BreadcrumbList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-1 text-muted-foreground", className)}
      {...props}
    />
  )
}

export function BreadcrumbItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("inline-flex items-center gap-1", className)} {...props} />
}

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: ComponentPropsWithoutRef<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return <Comp className={cn("hover:text-foreground", className)} {...props} />
}

export function BreadcrumbPage({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span aria-current="page" className={cn("font-medium text-foreground", className)} {...props} />
  )
}

export function BreadcrumbSeparator({ children }: { children?: ReactNode }) {
  return (
    <li aria-hidden className="text-muted-foreground">
      {children ?? <ChevronRight className="h-3.5 w-3.5" />}
    </li>
  )
}
