import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@pritish.budhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"

function OverlayPreview() {
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm</DialogTitle>
              <DialogDescription>This uses Radix focus management.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Composable overlay content.</PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>Keyboard accessible</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

const meta: Meta<typeof OverlayPreview> = {
  title: "Overlays/Primitives",
  component: OverlayPreview,
}

export default meta
type Story = StoryObj<typeof OverlayPreview>
export const Default: Story = {}
