import { Button, Toaster, toast } from "@pritish.budhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"

function ToastPreview() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Changes are stored locally in this demo.",
          })
        }
      >
        Show toast
      </Button>
      <Toaster />
    </>
  )
}

const meta: Meta<typeof ToastPreview> = {
  title: "Feedback/Toast",
  component: ToastPreview,
}

export default meta
type Story = StoryObj<typeof ToastPreview>
export const Default: Story = {}
