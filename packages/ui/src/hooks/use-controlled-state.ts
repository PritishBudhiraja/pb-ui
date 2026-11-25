import { useState } from "react"

export function useControlledState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const setValue = (next: T) => {
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
  }

  return [current, setValue]
}
