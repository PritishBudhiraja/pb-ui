import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

type HeadingTag = "h1" | "h2" | "h3" | "p"

export interface EditorialHeadingProps extends HTMLAttributes<HTMLElement> {
  as?: HeadingTag
}

export function EditorialHeading({ as: Tag = "h2", className, ...props }: EditorialHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif text-3xl font-normal tracking-tight text-foreground italic",
        className,
      )}
      {...props}
    />
  )
}
