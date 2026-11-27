import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "tooltip",
  name: "Tooltip",
  when: "Short hover/focus hint.",
  keywords: "tooltip hover focus",
  title: "Tooltip",
  kicker: "Overlay",
  description: "Wrap the tree in TooltipProvider.",
  preview: (
    <Preview code={`<TooltipProvider><Tooltip>…</Tooltip></TooltipProvider>`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>Keyboard accessible</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Preview>
  ),
  code: "",
  a11y: "Appears on hover and focus.",
  props: [{ name: "delayDuration", type: "number", description: "Provider delay" }],
}
