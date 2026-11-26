import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"
import { cn } from "../lib/cn"

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { label?: string }
>(({ className, value, label = "Progress", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    aria-label={label}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full bg-primary transition-transform motion-reduce:transition-none"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
ProgressBar.displayName = "ProgressBar"

export function ProgressRing({
  value = 0,
  size = 40,
  stroke = 4,
  className,
  label,
}: {
  value?: number
  size?: number
  stroke?: number
  className?: string
  label?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("text-primary", className)}
      role="img"
      aria-label={label ?? `${Math.round(value)} percent`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-secondary"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="origin-center -rotate-90 text-primary"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  )
}
