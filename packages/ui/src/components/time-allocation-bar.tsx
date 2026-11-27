import { cn } from "../lib/cn"

export interface AllocationSegment {
  label: string
  value: number
}

export interface TimeAllocationBarProps {
  segments: AllocationSegment[]
  className?: string
  label?: string
}

export function TimeAllocationBar({
  segments,
  className,
  label = "Time allocation",
}: TimeAllocationBarProps) {
  const total = segments.reduce((sum, item) => sum + Math.max(0, item.value), 0) || 1
  return (
    <div className={cn("grid gap-2", className)}>
      <div
        role="img"
        aria-label={label}
        className="flex h-3 overflow-hidden rounded-full border border-border"
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            title={`${segment.label}: ${segment.value}`}
            className={cn("h-full", index % 2 === 0 ? "bg-foreground" : "bg-foreground/40")}
            style={{ width: `${(Math.max(0, segment.value) / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {segments.map((segment, index) => (
          <li key={index}>
            {segment.label} · {segment.value}
          </li>
        ))}
      </ul>
    </div>
  )
}
