import { Input, Label } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "input",
  name: "Input",
  when: "Single-line text.",
  sibling: "SearchInput for filter bars.",
  title: "Input",
  kicker: "Form",
  description: "Native input with tokenized focus ring.",
  preview: (
    <Preview code={`<Input placeholder="Email" />`}>
      <div className="grid w-72 gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </div>
    </Preview>
  ),
  code: "",
  a11y: "Pair with Label via htmlFor. Native constraint validation still applies.",
  props: [{ name: "...", type: "InputHTMLAttributes", description: "All native input attributes" }],
}
