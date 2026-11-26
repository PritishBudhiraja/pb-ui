import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/cn"

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-3 text-left text-sm font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-none data-[state=open]:animate-none"
      {...props}
    >
      <div className={cn("pb-3 text-muted-foreground", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
