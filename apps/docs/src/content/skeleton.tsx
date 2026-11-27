import { Skeleton } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "skeleton",
  name: "Skeleton",
  when: "Placeholder while loading.",
  title: "Skeleton",
  kicker: "Feedback",
  description: "Pulse placeholder. Reduced motion disables the animation.",
  preview: (
    <Preview code={`<Skeleton className="h-8 w-40" />`}>
      <Skeleton className="h-8 w-40" />
    </Preview>
  ),
  a11y: "aria-hidden. Put a live status elsewhere if loading matters.",
  props: [{ name: "className", type: "string", description: "Size" }],
}
