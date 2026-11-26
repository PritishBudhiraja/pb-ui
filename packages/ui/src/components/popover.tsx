import * as PopoverPrimitive from "@radix-ui/react-popover"
import type * as React from "react"
import { cn } from "../lib/cn"

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

export function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ref,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[200] w-72 rounded-md border border-border bg-popover p-3 text-sm text-popover-foreground shadow-xl outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
