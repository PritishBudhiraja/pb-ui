"use client"

import { type HTMLAttributes, type ReactNode, useId } from "react"
import { FormFieldContext } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"
import { Label } from "./label"

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}) {
  const generatedId = useId()
  const id = htmlFor ?? generatedId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const showHint = Boolean(hint) && !error
  const describedBy = error ? errorId : showHint ? hintId : undefined

  return (
    <FormFieldContext.Provider value={{ id, describedBy, invalid: Boolean(error) }}>
      <div className={cn("grid gap-1.5", className)}>
        <Label htmlFor={id}>{label}</Label>
        {children}
        {showHint ? (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
        {error ? <FormError id={errorId}>{error}</FormError> : null}
      </div>
    </FormFieldContext.Provider>
  )
}

export function FormError({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-destructive", className)} role="alert" {...props} />
}
