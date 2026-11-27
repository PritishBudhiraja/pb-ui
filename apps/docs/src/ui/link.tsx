import type { ComponentProps } from "react"
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom"

// Every in-app link cross-fades between pages; see the ::view-transition rules in styles.css.
export function Link(props: ComponentProps<typeof RouterLink>) {
  return <RouterLink viewTransition {...props} />
}

export function NavLink(props: ComponentProps<typeof RouterNavLink>) {
  return <RouterNavLink viewTransition {...props} />
}
