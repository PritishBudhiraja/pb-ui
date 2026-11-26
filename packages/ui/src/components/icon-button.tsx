import type * as React from "react"
import { Button, type ButtonProps } from "./button"

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  label: string
}

export function IconButton({
  label,
  children,
  ref,
  ...props
}: IconButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <Button ref={ref} size="icon" aria-label={label} {...props}>
      {children}
    </Button>
  )
}
