import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "dropdown-menu",
  name: "DropdownMenu",
  when: "Action menu from a trigger.",
  title: "DropdownMenu",
  kicker: "Overlay",
  description: "Actions attached to a control.",
  preview: (
    <Preview code={`<DropdownMenu>…</DropdownMenu>`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Preview>
  ),
  a11y: "Arrow keys, typeahead, Escape. Right arrow opens a sub-menu.",
  props: [
    { name: "open", type: "boolean", description: "Controlled open" },
    {
      name: "parts",
      type: "Sub, SubTrigger, SubContent, RadioGroup, RadioItem, Portal",
      description: "Nested menus and single-choice items",
    },
  ],
}
