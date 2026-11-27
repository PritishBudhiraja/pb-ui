import { cn } from "../lib/cn"
import { Heading } from "./heading"
import { Text } from "./text"

export type StepStatus = "pending" | "current" | "done" | "error"

export interface StepItem {
  id: string
  label: string
  description?: string
  status?: StepStatus
}

export interface StepperProps {
  steps: StepItem[]
  current?: number
  numbered?: boolean
  className?: string
  label?: string
}

const statusText: Record<StepStatus, string> = {
  done: "Completed",
  current: "Current step",
  pending: "Not started",
  error: "Error",
}

function statusFor(index: number, current: number, explicit?: StepStatus): StepStatus {
  if (explicit) return explicit
  if (index < current) return "done"
  if (index === current) return "current"
  return "pending"
}

export function Stepper({
  steps,
  current = 0,
  numbered = false,
  className,
  label = "Steps",
}: StepperProps) {
  return (
    <ol aria-label={label} className={cn("grid gap-3", className)}>
      {steps.map((step, index) => {
        const status = statusFor(index, current, step.status)
        return (
          <li
            key={step.id}
            className="flex gap-3"
            aria-current={status === "current" ? "step" : undefined}
          >
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]",
                status === "done" && "border-foreground bg-foreground text-background",
                status === "current" && "border-foreground text-foreground",
                status === "pending" && "border-border text-muted-foreground",
                status === "error" && "border-destructive text-destructive",
              )}
            >
              {numbered ? (
                index + 1
              ) : (
                <span aria-hidden>{status === "done" ? "✓" : status === "error" ? "!" : "•"}</span>
              )}
              <span className="sr-only">{statusText[status]}</span>
            </span>
            <div>
              <Heading as="h3" size="sm">
                {step.label}
              </Heading>
              {step.description ? (
                <Text tone="muted" className="text-xs">
                  {step.description}
                </Text>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function MilestoneStepper(props: Omit<StepperProps, "numbered">) {
  return <Stepper numbered {...props} label={props.label ?? "Milestones"} />
}

export function WorkflowStepper(props: Omit<StepperProps, "numbered">) {
  return <Stepper {...props} label={props.label ?? "Workflow"} />
}
