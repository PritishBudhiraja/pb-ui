"use client"

import { Check, Copy } from "lucide-react"
import { useClipboard } from "../hooks/use-clipboard"
import { toast } from "../hooks/use-toast"
import { cn } from "../lib/cn"

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  const { copied, copy } = useClipboard()

  async function onCopy() {
    try {
      await copy(value)
      toast({ title: "Copied", description: label })
    } catch {
      toast({ title: "Could not copy", description: label, variant: "destructive" })
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label}`}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}
