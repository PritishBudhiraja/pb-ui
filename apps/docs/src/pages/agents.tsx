import { EditorialHeading, Text } from "@pritish.budhiraja/ui"
import { AGENT_PROMPT } from "../agent-prompt"
import { CodeBlock, PromptBlock } from "../ui/code"
import { PageHeader } from "../ui/preview"

const LINKS = [
  {
    title: "llms.txt",
    href: "/llms.txt",
    body: "Curated index: rules, setup, and the component catalog.",
  },
  {
    title: "llms-full.txt",
    href: "/llms-full.txt",
    body: "Longer reference with when-to-use notes for every documented component.",
  },
  {
    title: "AGENTS.md",
    href: "https://github.com/PritishBudhiraja/pb-ui/blob/main/AGENTS.md",
    body: "Component-first process and hard constraints in the repo.",
  },
  {
    title: "npm",
    href: "https://www.npmjs.com/package/@pritish.budhiraja/ui",
    body: "@pritish.budhiraja/ui and @pritish.budhiraja/tokens.",
  },
]

export function AgentsPage() {
  return (
    <article className="space-y-10">
      <PageHeader
        kicker="Agents"
        title="Machine-readable Hatch for coding assistants."
        description="Cursor, Claude Code, Codex, and the rest should install from npm, follow the invariants, and compose existing components instead of inventing a parallel kit."
      />

      <section className="space-y-3">
        <EditorialHeading as="h2">System prompt</EditorialHeading>
        <Text tone="muted">
          Paste this into a project rule or a kickoff message. Agents should not pause to ask which
          Hatch components to install — they should add the package and compose.
        </Text>
        <PromptBlock value={AGENT_PROMPT} />
      </section>

      <section className="space-y-3">
        <EditorialHeading as="h2">Endpoints</EditorialHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md border border-dashed border-border p-4 hover:bg-muted/40"
            >
              <p className="font-medium">{link.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{link.body}</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">{link.href}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <EditorialHeading as="h2">Invariants for generated code</EditorialHeading>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Install <code>@pritish.budhiraja/ui</code>. Import{" "}
            <code>@pritish.budhiraja/ui/styles.css</code> once.
          </li>
          <li>
            Set <code>data-theme</code> and the <code>dark</code> class on the document. Do not
            hardcode hex in components.
          </li>
          <li>
            OriginButton and ScrollProgress come from <code>@pritish.budhiraja/ui/motion</code>.
          </li>
          <li>ThemeToggle is controlled. Do not put next-themes inside the library.</li>
          <li>No next/link inside Hatch components. No Epoch SeasonCard or FocusTimer here.</li>
          <li>Inspect existing names before adding a duplicate with a new label.</li>
        </ul>
        <CodeBlock
          label="Minimal install"
          code={`pnpm add @pritish.budhiraja/ui
import "@pritish.budhiraja/ui/styles.css"`}
        />
      </section>
    </article>
  )
}
