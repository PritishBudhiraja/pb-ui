import * as AvatarPrimitive from "@radix-ui/react-avatar"
import type * as React from "react"
import { cn } from "../../lib/cn"

export function Avatar({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border",
        className,
      )}
      {...props}
    />
  )
}

export function AvatarImage({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}
