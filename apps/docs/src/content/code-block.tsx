import { CodeBlock } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "code-block",
  name: "CodeBlock",
  when: "Copyable snippet.",
  title: "CodeBlock",
  kicker: "Content",
  description: "Dashed pre with CopyButton. No toast in the library.",
  preview: (
    <Preview code={`<CodeBlock code="pnpm add @pritish.budhiraja/ui" />`}>
      <CodeBlock className="w-full" code="pnpm add @pritish.budhiraja/ui" />
    </Preview>
  ),
  a11y: "Copy control is labelled.",
  props: [{ name: "code", type: "string", description: "Plain text" }],
}
