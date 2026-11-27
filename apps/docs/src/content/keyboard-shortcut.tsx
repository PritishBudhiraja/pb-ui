import { KeyboardShortcut } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "keyboard-shortcut",
  name: "KeyboardShortcut",
  when: "Visible kbd hint.",
  title: "KeyboardShortcut",
  kicker: "Primitive",
  description: "Visible kbd chips. Does not bind the shortcut — use useKeyboardShortcut.",
  preview: (
    <Preview code={`<KeyboardShortcut keys={["⌘", "K"]} />`}>
      <KeyboardShortcut keys={["⌘", "K"]} />
    </Preview>
  ),
  a11y: "kbd. Decorative relative to a labelled control.",
  props: [{ name: "keys", type: "string[]", description: "Key captions" }],
}
