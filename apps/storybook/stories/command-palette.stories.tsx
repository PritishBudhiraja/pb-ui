import { CommandPalette, type CommandPaletteItem } from "@pritishbudhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"

function PalettePreview() {
  return (
    <CommandPalette
      items={[
        { id: "home", label: "Home", group: "Pages" },
        { id: "docs", label: "Documentation", group: "Pages" },
        { id: "github", label: "GitHub", group: "Links", href: "https://example.com" },
      ]}
      onSelect={(item: CommandPaletteItem) => {
        console.info(item)
      }}
    />
  )
}

const meta: Meta<typeof PalettePreview> = {
  title: "Overlays/CommandPalette",
  component: PalettePreview,
}

export default meta
type Story = StoryObj<typeof PalettePreview>
export const Default: Story = {}
