import { Search } from "lucide-react"
import * as React from "react"
import { cn } from "../lib/cn"
import { Input, type InputProps } from "./input"

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input ref={ref} type="search" className={cn("pl-9", className)} {...props} />
    </div>
  ),
)
SearchInput.displayName = "SearchInput"
