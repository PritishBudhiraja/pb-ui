"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { isEditableTarget } from "../lib/dom"

export function useKeyboardShortcut(
  combo: {
    key: string
    meta?: boolean
    ctrl?: boolean
    shift?: boolean
    allowInInputs?: boolean
  },
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
      // Plain keys belong to the field being typed in; modifier chords still fire.
      const typing = !combo.meta && !combo.ctrl && isEditableTarget(event.target)
      if (typing && !combo.allowInInputs) return
      handlerRef.current(event)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [combo.key, combo.meta, combo.ctrl, combo.shift, combo.allowInInputs, enabled])
}
