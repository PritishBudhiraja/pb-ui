import { LoaderCircle } from "lucide-react"
import { cn } from "../../lib/cn"

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span role="status" className={cn("inline-flex text-muted-foreground", className)}>
      <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />
      <span className="sr-only">{label}</span>
    </span>
  )
}
