import { CommandPalette } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "command-palette",
  name: "CommandPalette",
  when: "⌘K jump list. Pass items from the host.",
  title: "CommandPalette",
  kicker: "Overlay",
  description:
    "Generic cmdk dialog. This docs site uses it for navigation. No hardcoded portfolio routes.",
  preview: (
    <Preview code={`<CommandPalette items={…} onSelect={…} />`}>
      <CommandPalette
        items={[
          { id: "a", label: "Introduction", group: "Docs" },
          { id: "b", label: "Button", group: "Components" },
        ]}
        onSelect={() => undefined}
      />
    </Preview>
  ),
  code: "",
  a11y: "⌘K / Ctrl+K. Dialog is labelled. Trigger exposes aria-expanded. With two palettes on a page, one press opens only the first.",
  props: [
    { name: "items", type: "CommandPaletteItem[]", description: "Searchable entries" },
    {
      name: "shortcut",
      type: "string | false",
      description: "Letter used with ⌘ / Ctrl. Default k; false turns it off",
    },
    { name: "onSelect", type: "(item) => void", description: "Called after close" },
  ],
}
