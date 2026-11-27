import { Alert, AlertDescription, AlertTitle } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "alert",
  name: "Alert",
  when: "Inline status, not a toast.",
  title: "Alert",
  kicker: "Feedback",
  description: "Inline status, not a toast.",
  preview: (
    <Preview code={`<Alert><AlertTitle>Saved</AlertTitle></Alert>`}>
      <Alert className="w-full">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>The host still owns persistence.</AlertDescription>
      </Alert>
    </Preview>
  ),
  a11y: "role=alert.",
  props: [
    {
      name: "variant",
      type: "default | destructive",
      defaultValue: "default",
      description: "Tone",
    },
  ],
}
