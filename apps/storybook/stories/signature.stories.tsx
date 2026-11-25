import {
  CalendarHeatmap,
  EditorialAnnotation,
  EditorialHeading,
  EmptyState,
  FramedContainer,
  HatchDivider,
  Heading,
  Surface,
  Text,
  ThemeToggle,
  toHeatmapLevel,
} from "@pritishbudhiraja/ui"
import { OriginButton } from "@pritishbudhiraja/ui/motion"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

function SignaturePreview() {
  const [theme, setTheme] = useState("light")
  const days = Array.from({ length: 14 }, (_, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count: i % 4,
    level: toHeatmapLevel(i % 5),
  }))

  return (
    <div className="w-[720px] max-w-[90vw]">
      <FramedContainer>
        <div className="relative space-y-4 p-6">
          <EditorialAnnotation>signature language</EditorialAnnotation>
          <div className="flex items-center justify-between">
            <Heading as="h1" size="lg">
              Hatch
            </Heading>
            <ThemeToggle
              theme={theme}
              setTheme={(next: string) => {
                setTheme(next)
                document.documentElement.classList.toggle("dark", next === "dark")
              }}
            />
          </div>
          <EditorialHeading>Calm, editorial, reusable.</EditorialHeading>
          <Text tone="muted">Extracted from the portfolio visual system, not a generic kit.</Text>
          <HatchDivider />
          <div className="flex gap-3">
            <OriginButton>Primary action</OriginButton>
            <OriginButton variant="outline">Secondary</OriginButton>
          </div>
          <Surface className="p-4">
            <EmptyState
              title="Nothing here yet"
              description="Use EmptyState for first-run screens."
            />
          </Surface>
          <CalendarHeatmap days={days} from="2026-01-01" to="2026-01-14" />
        </div>
      </FramedContainer>
    </div>
  )
}

const meta: Meta<typeof SignaturePreview> = {
  title: "Signature/Overview",
  component: SignaturePreview,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof SignaturePreview>
export const Default: Story = {}
