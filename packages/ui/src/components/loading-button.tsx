import { Button, type ButtonProps } from "./button"
import { Spinner } from "./spinner"

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

export function LoadingButton({
  loading = false,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? <Spinner label="Loading" /> : null}
      {children}
    </Button>
  )
}
