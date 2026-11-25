import type { ReactNode } from "react"
import { Button } from "./button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"

export function MobileNavigation({
  title = "Menu",
  triggerLabel = "Open menu",
  children,
}: {
  title?: string
  triggerLabel?: string
  children: ReactNode
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 grid gap-1">{children}</nav>
      </SheetContent>
    </Sheet>
  )
}
