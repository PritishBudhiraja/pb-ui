import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "sheet",
  name: "Sheet",
  when: "Side panel. Drawer is an alias.",
  title: "Sheet",
  kicker: "Overlay",
  description: "Edge panel. Drawer is an alias of the same primitive.",
  preview: (
    <Preview
      code={`<Sheet><SheetTrigger asChild><Button>Open</Button></SheetTrigger><SheetContent>…</SheetContent></Sheet>`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Panel</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Preview>
  ),
  a11y: "Same dialog semantics as Dialog. Title is required.",
  props: [
    {
      name: "side",
      type: "top | right | bottom | left",
      defaultValue: "right",
      description: "Edge",
    },
  ],
}
