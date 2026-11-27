"use client"

import { cn } from "../../lib/cn"
import { CopyButton } from "../actions/copy-button"
import { Surface } from "../signature/surface"

export interface CodeBlockProps {
  code: string
  label?: string
  className?: string
  onCopied?: (value: string) => void
  onCopyError?: (error: unknown) => void
}

export function CodeBlock({
  code,
  label = "Code",
  className,
  onCopied,
  onCopyError,
}: CodeBlockProps) {
  return (
    <Surface className={cn("relative overflow-hidden bg-muted/40", className)}>
      <CopyButton
        value={code}
        label={label}
        onCopied={onCopied}
        onCopyError={onCopyError}
        className="absolute right-2 top-2 h-7 w-7"
      />
      <pre className="overflow-x-auto p-4 pr-12 text-[12px] leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
    </Surface>
  )
}
