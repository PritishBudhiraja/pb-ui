import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

export function FramedContainer({
  children,
  wide = false,
  className,
}: {
  children: ReactNode
  wide?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "site-frame min-h-screen overflow-x-clip xl:overflow-x-visible",
        wide && "site-frame--wide",
        className,
      )}
    >
      <div
        className={cn(
          "site-frame-column mx-auto min-h-screen border-x border-dashed border-border",
          wide ? "max-w-[1120px]" : "max-w-[720px]",
        )}
      >
        {children}
      </div>
    </div>
  )
}
