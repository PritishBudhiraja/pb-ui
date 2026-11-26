"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

// False on the server and while hydrating, true afterwards. Lets a component
// render locale- or clock-dependent text only once it is safe to differ from
// the server's HTML.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

// The locale to format with: the given one, else a fixed one until hydration so
// server and client markup match, then the user's own.
export function useFormatLocale(locale?: string) {
  const hydrated = useHydrated()
  return locale ?? (hydrated ? undefined : "en-US")
}
