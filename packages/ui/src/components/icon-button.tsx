import * as React from "react"
import { Button, type ButtonProps } from "./button"

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  label: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, children, ...props }, ref) => {
    return (
      <Button ref={ref} size="icon" aria-label={label} {...props}>
        {children}
      </Button>
    )
  },
)
IconButton.displayName = "IconButton"
