import { CopyButton, cn } from "@pritishbudhiraja/ui"
import type { ReactNode } from "react"

export function Preview({
  children,
  code,
  className,
}: {
  children: ReactNode
  code?: string
  className?: string
}) {
  return (
    <div className="overflow-visible rounded-md border border-dashed border-border">
      <div
        className={cn("flex min-h-24 flex-wrap items-center gap-3 bg-background p-6", className)}
      >
        {children}
      </div>
      {code ? (
        <div className="relative border-t border-dashed border-border bg-muted/40">
          <CopyButton
            value={code}
            label="Example code"
            className="absolute right-2 top-2 h-7 w-7"
          />
          <pre className="overflow-x-auto p-4 pr-12 text-[12px] leading-relaxed text-muted-foreground">
            <code>{code}</code>
          </pre>
        </div>
      ) : null}
    </div>
  )
}

export function PropTable({
  rows,
}: {
  rows: Array<{ name: string; type: string; defaultValue?: string; description: string }>
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-dashed border-border text-xs text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Prop</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 pr-4 font-medium">Default</th>
            <th className="py-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-dashed border-border align-top">
              <td className="py-2 pr-4 font-mono text-xs">{row.name}</td>
              <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{row.type}</td>
              <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">
                {row.defaultValue ?? "—"}
              </td>
              <td className="py-2 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker?: string
  title: string
  description: string
}) {
  return (
    <header className="space-y-2">
      {kicker ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {kicker}
        </p>
      ) : null}
      <h1 className="font-sans text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
    </header>
  )
}
