import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

const alertVariants = cva("relative w-full rounded-md border px-4 py-3 text-sm", {
  variants: {
    variant: {
      default: "border-border bg-background text-foreground",
      destructive: "border-destructive/40 bg-destructive/10 text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
})

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-medium", className)} {...props} />
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1 text-muted-foreground", className)} {...props} />
}
