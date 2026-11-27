import { Button, Popover, PopoverContent, PopoverTrigger } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "popover",
  name: "Popover",
  when: "Small anchored panel.",
  title: "Popover",
  kicker: "Overlay",
  description: "Positioned panel.",
  preview: (
    <Preview
      code={`<Popover><PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger><PopoverContent>…</PopoverContent></Popover>`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Popover</Button>
        </PopoverTrigger>
        <PopoverContent>Composable overlay content.</PopoverContent>
      </Popover>
    </Preview>
  ),
  code: "",
  a11y: "Radix focus and dismiss behavior.",
  props: [{ name: "open", type: "boolean", description: "Controlled open state" }],
}
