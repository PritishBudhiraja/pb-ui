import { Button, toast } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "toast",
  name: "Toast",
  when: "Transient confirmation. Mount Toaster once.",
  keywords: "toast notification queue",
  title: "Toast",
  kicker: "Feedback",
  description: "Radix toast with a 3-item queue and 4s removal. Mount Toaster once.",
  preview: (
    <Preview code={`toast({ title: "Saved", description: "Done." })`}>
      <Button
        onClick={() => toast({ title: "Saved", description: "Changes stored in this demo." })}
      >
        Show toast
      </Button>
    </Preview>
  ),
  code: "",
  a11y: "Viewport is a live region. Close button appears on hover and focus.",
  props: [
    { name: "title", type: "ReactNode", description: "Heading" },
    {
      name: "variant",
      type: "default | destructive",
      defaultValue: "default",
      description: "Tone",
    },
  ],
}
