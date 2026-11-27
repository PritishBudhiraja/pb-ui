import { cn } from "../lib/cn"
import { EditorialHeading } from "./editorial-heading"

export interface CountdownDisplayProps {
  remainingSeconds: number
  className?: string
  label?: string
}

function parts(total: number) {
  const safe = Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  return { hours, minutes, seconds }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

export function CountdownDisplay({
  remainingSeconds,
  className,
  label = "Remaining",
}: CountdownDisplayProps) {
  const { hours, minutes, seconds } = parts(remainingSeconds)
  const text = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return (
    <EditorialHeading
      as="p"
      role="timer"
      aria-label={`${label} ${text}`}
      className={cn("text-4xl tabular-nums", className)}
    >
      {text}
    </EditorialHeading>
  )
}
