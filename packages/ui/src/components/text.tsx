import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

const textVariants = cva("text-sm leading-relaxed", {
  variants: {
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      editorial: "text-[color:var(--editorial)]",
    },
  },
  defaultVariants: {
    tone: "default",
  },
})

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text({ className, tone, ...props }: TextProps) {
  return <p className={cn(textVariants({ tone }), className)} {...props} />
}
