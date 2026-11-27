import { cn } from "../../lib/cn"

export function KeyboardShortcut({ keys, className }: { keys: string[]; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[0.7rem] text-muted-foreground",
        className,
      )}
    >
      {keys.map((key) => (
        <span key={key} className="rounded border border-border bg-muted px-1.5 py-0.5">
          {key}
        </span>
      ))}
    </kbd>
  )
}
