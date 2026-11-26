import { Button, EditorialHeading, HatchDivider, Text } from "@pritish.budhiraja/ui"
import { useDocsTheme } from "../theme"
import { PageHeader } from "../ui/preview"

const SWATCHES = [
  "background",
  "foreground",
  "primary",
  "muted",
  "border",
  "destructive",
  "editorial",
] as const

export function FoundationsPage() {
  const { mode, setMode } = useDocsTheme()

  return (
    <article className="space-y-14">
      <PageHeader
        kicker="Foundations"
        title="Tokens, type, and the rules we will not break."
        description="Hatch is a three-layer token system — primitive, semantic, then component only when a primitive is not enough. One palette. Mode comes from the dark class."
      />

      <section id="philosophy" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Philosophy</EditorialHeading>
        <Text tone="muted">
          Minimal, editorial, calm, keyboard-friendly, composable. Dashed structure, hatch dividers,
          handwritten asides, and origin-ripple CTAs are the identity.
        </Text>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Preserve portfolio visual parity. Do not silently redesign a consumer.</li>
          <li>Prefer reuse and composition over a new component with a new name.</li>
          <li>Expressive serif is for headings and notes. Functional UI stays sans.</li>
        </ul>
      </section>

      <section id="invariants" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Invariants</EditorialHeading>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>No Next.js APIs in library components (next/link, next/navigation, next/font).</li>
          <li>
            No Epoch domain widgets (SeasonCard, FocusTimer, TaskRow, TimeBlock, JournalEditor).
          </li>
          <li>No hardcoded product colors. Semantic CSS variables only.</li>
          <li>Motion is an optional peer. Core UI must not import framer-motion.</li>
          <li>Theme storage stays in the host. ThemeToggle is controlled.</li>
        </ul>
      </section>

      <section id="colors" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Colors</EditorialHeading>
        <Text tone="muted">
          Semantic variables. Near-neutral grayscale — the same palette as the live site.
        </Text>
        <div className="grid gap-3 sm:grid-cols-2">
          {SWATCHES.map((name) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-md border border-dashed border-border p-3"
            >
              <span
                className="h-10 w-10 rounded-md border border-border"
                style={{ background: `var(--${name})` }}
              />
              <div>
                <p className="text-sm font-medium">--{name}</p>
                <p className="text-xs text-muted-foreground">
                  bg-{name} / text-{name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="typography" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Typography</EditorialHeading>
        <Text tone="muted">
          Semantic families: sans for UI, serif for editorial display, hand for annotations, mono
          for code. Editorial serif is Instrument Serif. The portfolio host maps sans to Geist; this
          docs site uses Inter so it can run without next/font. Override --pb-font-* in the host.
        </Text>
        <div className="space-y-4 rounded-md border border-dashed border-border p-4">
          <p className="font-sans text-2xl font-semibold tracking-tight">Sans heading</p>
          <p className="font-serif text-3xl italic">Editorial serif</p>
          <p className="font-hand text-xl text-muted-foreground">handwritten annotation</p>
          <p className="font-mono text-sm">mono / kbd / code</p>
        </div>
      </section>

      <section id="spacing" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Spacing</EditorialHeading>
        <Text tone="muted">
          Default content column is 720px. Wide frame is 1120px. Hatch height is 1.125rem. Radius is
          0.5rem. Use Tailwind spacing with token colors — do not invent a second scale.
        </Text>
        <HatchDivider />
      </section>

      <section id="motion" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Motion</EditorialHeading>
        <Text tone="muted">
          Theme reveal is 400ms with a circular View Transition from the toggle. OriginButton uses a
          spring ripple from the pointer. Both respect prefers-reduced-motion. Import
          @pritish.budhiraja/ui/motion only for OriginButton and ScrollProgress.
        </Text>
      </section>

      <section id="themes" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Themes</EditorialHeading>
        <Text tone="muted">
          One palette. Set <code>data-theme="portfolio"</code> on the document. The dark class
          selects light or dark.
        </Text>
        <Button
          variant={mode === "dark" ? "default" : "outline"}
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          Toggle {mode}
        </Button>
      </section>

      <section id="accessibility" className="scroll-mt-20 space-y-3">
        <EditorialHeading as="h2">Accessibility</EditorialHeading>
        <Text tone="muted">
          Target WCAG 2.2 AA for shipped behavior: semantic HTML, focus-visible rings, labels on
          icon-only controls, Radix focus management, reduced motion.
        </Text>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>IconButton requires a label prop.</li>
          <li>
            CalendarHeatmap exposes a text summary, not title-only cells as the sole description.
          </li>
          <li>CommandPalette is a labeled dialog with ⌘K / Ctrl+K.</li>
          <li>ThemeToggle waits until mount so SSR hosts do not flash the wrong icon.</li>
        </ul>
      </section>
    </article>
  )
}
