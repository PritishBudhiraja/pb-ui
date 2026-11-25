import type { HTMLAttributes, ReactNode } from "react"
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
  const hintId = htmlFor ? `${htmlFor}-hint` : undefined
  const errorId = htmlFor ? `${htmlFor}-error` : undefined

  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? <FormError id={errorId}>{error}</FormError> : null}
    </div>
  )
}

export function FormError({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-destructive", className)} role="alert" {...props} />
}
