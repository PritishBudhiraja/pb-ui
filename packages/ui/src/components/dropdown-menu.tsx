import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check } from "lucide-react"
import type * as React from "react"
import { cn } from "../lib/cn"
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from "../lib/menu"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export function DropdownMenuContent({
  className,
  sideOffset = 8,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(menuContentClass, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item ref={ref} className={cn(menuItemClass, className)} {...props} />
  )
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(menuItemClass, "pr-8", className)}
      {...props}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="absolute right-2">
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuLabel({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label ref={ref} className={cn(menuLabelClass, className)} {...props} />
  )
}

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(menuSeparatorClass, className)}
      {...props}
    />
  )
}
