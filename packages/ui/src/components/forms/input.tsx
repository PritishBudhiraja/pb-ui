"use client"

import type * as React from "react"
import { useFormFieldControl } from "../../hooks/use-form-field-control"
import { cn } from "../../lib/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({
  className,
  type = "text",
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const field = useFormFieldControl(props)
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
      {...field}
    />
  )
}
