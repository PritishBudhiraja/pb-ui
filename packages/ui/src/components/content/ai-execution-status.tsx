import { cn } from "../../lib/cn"
import { Badge } from "../data/badge"
import { Text } from "../data/text"
import { Surface } from "../signature/surface"

export type ExecutionStatus = "pending" | "running" | "done" | "error"

export interface ExecutionStep {
  id: string
  label: string
  status: ExecutionStatus
  detail?: string
}

export interface AIExecutionStatusProps {
  steps: ExecutionStep[]
  className?: string
  label?: string
}

const LABELS: Record<ExecutionStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  error: "Error",
}

export function AIExecutionStatus({
  steps,
  className,
  label = "Execution",
}: AIExecutionStatusProps) {
  return (
    <ul aria-label={label} className={cn("grid gap-2", className)}>
      {steps.map((step) => (
        <li key={step.id}>
          <Surface className="flex items-start justify-between gap-3 px-3 py-2">
            <div>
              <Text className="font-medium">{step.label}</Text>
              {step.detail ? (
                <Text tone="muted" className="text-xs">
                  {step.detail}
                </Text>
              ) : null}
            </div>
            <Badge variant={step.status === "error" ? "destructive" : "secondary"}>
              {LABELS[step.status]}
            </Badge>
          </Surface>
        </li>
      ))}
    </ul>
  )
}
