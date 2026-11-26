import { Text } from "@pritish.budhiraja/ui"
import { PageHeader } from "../ui/preview"

export function HooksPage() {
  return (
    <article className="space-y-6">
      <PageHeader
        kicker="Utilities"
        title="Hooks and utilities"
        description="Small helpers. Theme storage stays in the host."
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
          <code>useKeyboardShortcut</code> — key + modifier; plain keys ignored while typing unless{" "}
          <code>allowInInputs</code>
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
        description="Published as @pritish.budhiraja/tokens and @pritish.budhiraja/ui."
      />
      <Text tone="muted">
        0.4.0 — catalogue, motion entry, Tailwind v4 stylesheet, docs at ui.pritishbudhiraja.com.
        0.1.0 — first npm release of tokens and signature set.
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
