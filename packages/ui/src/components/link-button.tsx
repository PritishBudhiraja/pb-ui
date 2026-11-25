import { Button, type ButtonProps } from "./button"

export type LinkButtonProps = Omit<ButtonProps, "asChild"> & {
  href: string
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Button asChild {...props}>
      <a href={href}>{children}</a>
    </Button>
  )
}
