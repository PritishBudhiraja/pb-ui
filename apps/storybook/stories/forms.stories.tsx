import { Checkbox, Input, Label, Textarea } from "@pritish.budhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"

function FormPreview() {
  return (
    <form className="flex w-80 flex-col gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" placeholder="Optional note" />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Checkbox id="agree" />
        <Label htmlFor="agree">Subscribe</Label>
      </div>
    </form>
  )
}

const meta: Meta<typeof FormPreview> = {
  title: "Primitives/Forms",
  component: FormPreview,
}

export default meta
type Story = StoryObj<typeof FormPreview>
export const Default: Story = {}
