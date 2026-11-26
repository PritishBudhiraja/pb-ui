"use client"

import { type RefObject, useEffect } from "react"

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | PointerEvent) => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return
    const onPointer = (event: PointerEvent) => {
      const node = ref.current
      if (!node || node.contains(event.target as Node)) return
      handler(event)
    }
    document.addEventListener("pointerdown", onPointer)
    return () => document.removeEventListener("pointerdown", onPointer)
  }, [ref, handler, enabled])
}
