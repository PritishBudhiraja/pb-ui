import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      column: "flex-col",
      row: "flex-row",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },
  defaultVariants: { direction: "column", gap: "md" },
})

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export function Stack({ className, direction, gap, ...props }: StackProps) {
  return <div className={cn(stackVariants({ direction, gap }), className)} {...props} />
}

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },
  defaultVariants: { columns: 2, gap: "md" },
})

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export function Grid({ className, columns, gap, ...props }: GridProps) {
  return <div className={cn(gridVariants({ columns, gap }), className)} {...props} />
}
