import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/cn"
import { Heading } from "../data/heading"
import { Surface } from "../signature/surface"

export interface InspectorPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children?: ReactNode
}

export function InspectorPanel({ title, children, className, ...props }: InspectorPanelProps) {
  return (
    <Surface className={cn("flex h-full flex-col p-3", className)} {...props}>
      <Heading as="h2" size="sm">
        {title}
      </Heading>
      <div className="mt-3 min-h-0 flex-1 text-sm text-muted-foreground">{children}</div>
    </Surface>
  )
}
