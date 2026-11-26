"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { useClipboard } from "../hooks/use-clipboard"
import { cn } from "../lib/cn"

export interface CopyButtonProps {
  value: string
  label: string
  "aria-label"?: string
  copiedText?: string
  errorText?: string
  onCopied?: (value: string) => void
  onCopyError?: (error: unknown) => void
  className?: string
}

export function CopyButton({
  value,
  label,
  "aria-label": ariaLabel,
  copiedText = "Copied",
  errorText = "Could not copy",
  onCopied,
  onCopyError,
  className,
}: CopyButtonProps) {
  const { copied, copy } = useClipboard()
  const [failed, setFailed] = useState(false)
  const [copies, setCopies] = useState(0)
  const showCopied = copied && !failed
  // A trailing no-break space on every other copy changes the live region's text,
  // so screen readers announce a repeat copy instead of ignoring it.
  const copiedStatus = copies % 2 === 0 ? copiedText : `${copiedText}\u00a0`
  const status = failed ? errorText : showCopied ? copiedStatus : ""

  async function onCopy() {
    setFailed(false)
    try {
      await copy(value)
      setCopies((count) => count + 1)
      onCopied?.(value)
    } catch (error) {
      setFailed(true)
      onCopyError?.(error)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={ariaLabel ?? `Copy ${label}`}
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        {showCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
      <span role="status" className="sr-only">
        {status}
      </span>
    </>
  )
}
