import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "dialog",
  name: "Dialog",
  when: "Modal task.",
  title: "Dialog",
  kicker: "Overlay",
  description: "Radix dialog with portfolio overlay blur.",
  preview: (
    <Preview
      code={`<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent>…</DialogContent></Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>Focus is trapped until you close.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Preview>
  ),
  code: "",
  a11y: "Escape closes. Focus returns to the trigger. Title is required for the accessible name.",
  props: [{ name: "open", type: "boolean", description: "Controlled open state" }],
}
