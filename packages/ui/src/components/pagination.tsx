import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "../lib/cn"
import { Button } from "./button"

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props} />
  )
}

export function PaginationButton({
  current,
  children,
  ...props
}: ComponentProps<typeof Button> & { current?: boolean }) {
  return (
    <Button
      variant={current ? "outline" : "ghost"}
      size="sm"
      aria-current={current ? "page" : undefined}
      {...props}
    >
      {children}
    </Button>
  )
}

export function PaginationPrevious(props: ComponentProps<typeof Button>) {
  return (
    <PaginationButton {...props}>
      <ChevronLeft />
      Previous
    </PaginationButton>
  )
}

export function PaginationNext(props: ComponentProps<typeof Button>) {
  return (
    <PaginationButton {...props}>
      Next
      <ChevronRight />
    </PaginationButton>
  )
}
