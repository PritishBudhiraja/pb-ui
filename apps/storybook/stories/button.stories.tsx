import { Button } from "@pritish.budhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Save" },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}
export const Outline: Story = { args: { variant: "outline" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
