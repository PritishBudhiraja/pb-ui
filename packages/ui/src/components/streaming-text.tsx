import { cn } from "../lib/cn"
import { Text } from "./text"

export interface StreamingTextProps {
  text: string
  streaming?: boolean
  className?: string
}

export function StreamingText({ text, streaming = false, className }: StreamingTextProps) {
  return (
    <Text className={cn("whitespace-pre-wrap", className)} aria-live="polite" aria-busy={streaming}>
      {text}
      {streaming ? (
        <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-foreground motion-reduce:animate-none" />
      ) : null}
    </Text>
  )
}
