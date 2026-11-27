import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

const headingVariants = cva("font-sans tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-sm font-medium",
      md: "text-lg font-semibold",
      lg: "text-2xl font-semibold",
      xl: "text-4xl font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
