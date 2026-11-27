import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "context-menu",
  name: "ContextMenu",
  when: "Right-click menu.",
  title: "ContextMenu",
  kicker: "Overlay",
  description: "Right-click menu. Same item styles as DropdownMenu.",
  preview: (
    <Preview code={`<ContextMenu>…</ContextMenu>`}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="rounded-md border border-dashed border-border px-8 py-6 text-sm text-muted-foreground">
            Right click
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Preview>
  ),
  a11y: "Opens on contextmenu. Keyboard users should also have a visible menu trigger.",
  props: [
    { name: "onOpenChange", type: "(open) => void", description: "Open callback" },
    {
      name: "parts",
      type: "Sub, SubTrigger, SubContent, RadioGroup, RadioItem, Portal",
      description: "Same as DropdownMenu",
    },
  ],
}
