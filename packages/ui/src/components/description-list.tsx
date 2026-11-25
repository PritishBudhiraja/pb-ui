import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"

export function DescriptionList({ className, ...props }: HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("grid gap-3 sm:grid-cols-[8rem_1fr]", className)} {...props} />
}

export function DescriptionTerm({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <dt className={cn("text-xs font-medium text-muted-foreground", className)} {...props} />
}

export function DescriptionDetail({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <dd className={cn("text-sm", className)}>{children}</dd>
}
