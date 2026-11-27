import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "alert-dialog",
  name: "AlertDialog",
  when: "Destructive confirm.",
  title: "AlertDialog",
  kicker: "Overlay",
  description:
    "Confirm destructive work. Distinct from Dialog because cancel/action semantics are required.",
  preview: (
    <Preview code={`<AlertDialog>…</AlertDialog>`}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Preview>
  ),
  a11y: "Focus trap. Escape and cancel restore focus to the trigger.",
  props: [{ name: "open", type: "boolean", description: "Controlled open" }],
}
