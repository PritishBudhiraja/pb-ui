import { CopyButton, cn, toast } from "@pritish.budhiraja/ui"
import { type ReactNode, useState } from "react"
import { Link } from "react-router-dom"

const MANAGERS = ["pnpm", "npm", "bun"] as const
type Manager = (typeof MANAGERS)[number]

export function CodeBlock({
  code,
  label = "Code",
  className,
}: {
  code: string
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-dashed border-border bg-muted/40",
        className,
      )}
    >
      <CopyButton
        value={code}
        label={label}
        onCopied={() => toast({ title: "Copied", description: label })}
        onCopyError={() =>
          toast({ title: "Could not copy", description: label, variant: "destructive" })
        }
        className="absolute right-2 top-2 h-7 w-7"
      />
      <pre className="overflow-x-auto p-4 pr-12 text-[12px] leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function PackageManager({ packages }: { packages: Record<Manager, string> }) {
  const [manager, setManager] = useState<Manager>("pnpm")
  const command = packages[manager]

  return (
    <div className="overflow-hidden rounded-md border border-dashed border-border">
      <div className="flex items-center gap-1 border-b border-dashed border-border px-2 py-1.5">
        {MANAGERS.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[11px]",
              manager === item
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setManager(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <CodeBlock code={command} label={`${manager} install`} />
    </div>
  )
}

export function CategoryCard({
  index,
  title,
  purpose,
  href,
  children,
}: {
  index: string
  title: string
  purpose: string
  href: string
  children?: ReactNode
}) {
  return (
    <Link
      to={href}
      className="block rounded-md border border-dashed border-border p-4 transition-colors hover:bg-muted/40"
    >
      <p className="font-mono text-[11px] text-muted-foreground">{index}</p>
      <h3 className="mt-1 font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{purpose}</p>
      {children}
    </Link>
  )
}

export function PromptBlock({ value }: { value: string }) {
  return (
    <div className="space-y-2">
      <CodeBlock code={value} label="Agent prompt" className="max-h-[28rem] overflow-y-auto" />
    </div>
  )
}
