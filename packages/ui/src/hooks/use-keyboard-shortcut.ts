"use client"

import { useEffect, useLayoutEffect, useRef } from "react"

export function useKeyboardShortcut(
  combo: { key: string; meta?: boolean; ctrl?: boolean; shift?: boolean },
  handler: (event: KeyboardEvent) => void,
  enabled = true,
) {
  const handlerRef = useRef(handler)
  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!enabled) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== combo.key.toLowerCase()) return
      if (Boolean(combo.meta) !== event.metaKey) return
      if (Boolean(combo.ctrl) !== event.ctrlKey) return
      if (Boolean(combo.shift) !== event.shiftKey) return
      handlerRef.current(event)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [combo.key, combo.meta, combo.ctrl, combo.shift, enabled])
}
