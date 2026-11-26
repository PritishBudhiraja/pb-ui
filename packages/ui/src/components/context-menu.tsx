import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/cn"
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from "../lib/menu"

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuPortal = ContextMenuPrimitive.Portal
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup
export const ContextMenuSub = ContextMenuPrimitive.Sub

export function ContextMenuContent({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(menuContentClass, className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

export function ContextMenuItem({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item>) {
  return <ContextMenuPrimitive.Item ref={ref} className={cn(menuItemClass, className)} {...props} />
}

export function ContextMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(menuItemClass, "pr-8", className)}
      {...props}
    >
      {children}
      <ContextMenuPrimitive.ItemIndicator className="absolute right-2">
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.CheckboxItem>
  )
}

export function ContextMenuLabel({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label ref={ref} className={cn(menuLabelClass, className)} {...props} />
  )
}

export function ContextMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn(menuSeparatorClass, className)}
      {...props}
    />
  )
}

export function ContextMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(menuItemClass, "pr-8", className)}
      {...props}
    >
      {children}
      <ContextMenuPrimitive.ItemIndicator className="absolute right-2 flex items-center">
        <span className="h-2 w-2 rounded-full bg-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  )
}

export function ContextMenuSubTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(menuItemClass, "data-[state=open]:bg-accent", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

export function ContextMenuSubContent({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        className={cn(menuContentClass, className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}
