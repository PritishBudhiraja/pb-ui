import { Button, EditorialHeading, HatchDivider, Text } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { Link } from "react-router-dom"
import { useDocsTheme } from "../theme"
import { PageHeader, Preview } from "../ui/preview"

export function IntroductionPage() {
  return (
    <article className="space-y-8">
      <PageHeader
        kicker="Hatch"
        title="A personal design system, not a template."
        description="A React component library with a calm editorial voice: dashed structure, hatch rules, handwritten notes, and origin-ripple actions."
      />
      <Preview>
        <OriginButton>OriginButton</OriginButton>
        <Button variant="outline">Button</Button>
      </Preview>
      <div className="space-y-3">
        <EditorialHeading as="h2">What is in the library</EditorialHeading>
        <Text tone="muted">
          Two themes, form and overlay primitives, navigation and data display, and signature
          pieces: hatch, frame, annotation, heatmap, and OriginButton. This site is built with the
          same packages.
        </Text>
      </div>
      <HatchDivider />
      <ul className="grid gap-2 text-sm sm:grid-cols-2">
        <li>
          <Link className="underline-offset-2 hover:underline" to="/installation">
            Installation
          </Link>
        </li>
        <li>
          <Link className="underline-offset-2 hover:underline" to="/components/origin-button">
            OriginButton
          </Link>
        </li>
        <li>
          <Link className="underline-offset-2 hover:underline" to="/themes">
            Themes
          </Link>
        </li>
        <li>
          <Link className="underline-offset-2 hover:underline" to="/philosophy">
            Design philosophy
          </Link>
        </li>
      </ul>
    </article>
  )
}

export function InstallationPage() {
  const install = `pnpm add @pritish.budhiraja/ui`
  const usage = `import "@pritish.budhiraja/ui/styles.css"
import { Button } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"`

  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Setup"
        title="Installation"
        description="Install the UI package, import the stylesheet once, then import components. Until npm is live, use this workspace or GitHub."
      />
      <Preview code={install}>
        <Text tone="muted">
          Workspace install is already wired in apps/docs and apps/storybook.
        </Text>
      </Preview>
      <Preview code={usage}>
        <Button>Imported Button</Button>
      </Preview>
    </article>
  )
}

export function GettingStartedPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Setup"
        title="Getting started"
        description="Import CSS once, set data-theme on the document, then compose primitives. ThemeToggle is controlled — you own storage."
      />
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Import @pritish.budhiraja/ui/styles.css in the app root.</li>
        <li>Set data-theme="portfolio" or "epoch" and toggle the dark class.</li>
        <li>Load fonts and assign --pb-font-* if you are not using the docs defaults.</li>
        <li>Import motion components from @pritish.budhiraja/ui/motion only where needed.</li>
      </ol>
    </article>
  )
}

export function PhilosophyPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Design philosophy"
        description="Minimal, editorial, calm, keyboard-friendly, and composable. Dashed structure, hatch dividers, handwritten asides, and origin-ripple CTAs are the identity — not another neutral dashboard kit."
      />
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Preserve portfolio visual parity. Do not silently redesign it.</li>
        <li>Semantic tokens, not hardcoded product colors inside components.</li>
        <li>No Next.js in the library. No Epoch domain widgets here.</li>
        <li>Prefer reuse and composition over a new component with a new name.</li>
      </ul>
    </article>
  )
}

const SWATCHES = [
  "background",
  "foreground",
  "primary",
  "muted",
  "border",
  "destructive",
  "editorial",
] as const

export function ColorsPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Colors"
        description="Semantic CSS variables. Portfolio is near-neutral grayscale. Epoch is a candidate green editorial palette."
      />
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
    </article>
  )
}

export function TypographyPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Typography"
        description="Semantic families: sans for UI, serif for editorial display, hand for annotations. Portfolio uses Geist + Source Serif in production apps; this docs site uses Inter + Source Serif so it can run without next/font."
      />
      <div className="space-y-4">
        <p className="font-sans text-2xl font-semibold tracking-tight">Sans heading</p>
        <p className="font-serif text-3xl italic">Editorial serif</p>
        <p className="font-hand text-xl text-muted-foreground">handwritten annotation</p>
        <p className="font-mono text-sm">mono / kbd / code</p>
      </div>
    </article>
  )
}

export function SpacingPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Spacing"
        description="Default content column is 720px. Wide frame is 1120px. Hatch height is 1.125rem. Radius is 0.5rem."
      />
      <HatchDivider />
      <Text tone="muted">
        Use Tailwind spacing with token colors. Do not invent a second scale.
      </Text>
    </article>
  )
}

export function MotionPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Motion"
        description="Theme reveal is 400ms with a circular View Transition. OriginButton uses a spring ripple. Respect prefers-reduced-motion — ThemeToggle and OriginButton already do."
      />
      <Text tone="muted">
        Import @pritish.budhiraja/ui/motion only for OriginButton and ScrollProgress. Core UI has no
        framer-motion import.
      </Text>
    </article>
  )
}

export function ThemesPage() {
  const { preset, setPreset, mode, setMode } = useDocsTheme()
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Themes"
        description="data-theme selects the palette. The dark class selects the mode. Epoch palettes are proposed, not approved."
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant={preset === "portfolio" ? "default" : "outline"}
          onClick={() => setPreset("portfolio")}
        >
          Portfolio
        </Button>
        <Button
          variant={preset === "epoch" ? "default" : "outline"}
          onClick={() => setPreset("epoch")}
        >
          Epoch
        </Button>
        <Button
          variant={mode === "dark" ? "default" : "outline"}
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          Toggle {mode}
        </Button>
      </div>
    </article>
  )
}

export function AccessibilityPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Foundations"
        title="Accessibility"
        description="Target WCAG 2.2 AA for shipped behavior: semantic HTML, focus-visible rings, labels on icon-only controls, Radix focus management, reduced motion."
      />
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>IconButton requires a label prop.</li>
        <li>
          CalendarHeatmap exposes a text summary, not title-only cells as the sole description.
        </li>
        <li>CommandPalette is a labeled dialog with keyboard shortcut ⌘K / Ctrl+K.</li>
      </ul>
    </article>
  )
}

export function HooksPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Utilities"
        title="Hooks and utilities"
        description="Small helpers. Theme storage stays in the host (ADR-003)."
      />
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          <code>cn</code> — clsx + tailwind-merge
        </li>
        <li>
          <code>useClipboard</code> — copy with timeout cleanup
        </li>
        <li>
          <code>useReducedMotion</code> — prefers-reduced-motion
        </li>
        <li>
          <code>useToast</code> / <code>toast()</code> — module store, limit 3, 4s remove
        </li>
        <li>
          <code>useKeyboardShortcut</code> — key + modifier match
        </li>
        <li>
          <code>useMediaQuery</code> — matchMedia
        </li>
        <li>
          <code>useDebounce</code> — delayed value
        </li>
        <li>
          <code>useControlledState</code> — controlled or uncontrolled
        </li>
        <li>
          <code>useClickOutside</code> — pointerdown outside a ref
        </li>
      </ul>
    </article>
  )
}

export function ChangelogPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Project"
        title="Changelog"
        description="0.1.0 tokens and signature set, plus the remaining catalogue primitives."
      />
      <Text tone="muted">
        0.1.0 — tokens, primitives, signature components, Storybook, this site.
      </Text>
    </article>
  )
}

export function ContributingPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Project"
        title="Contributing"
        description="Follow AGENTS.md. Inspect existing components before adding a new name for the same job."
      />
      <Text tone="muted">pnpm lint && pnpm test && pnpm build from the repo root before a PR.</Text>
    </article>
  )
}
