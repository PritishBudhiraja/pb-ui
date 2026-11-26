import {
  Button,
  EditorialAnnotation,
  EditorialHeading,
  HatchDivider,
  Surface,
  Text,
  ThemeToggle,
} from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { Link } from "react-router-dom"
import { CATALOG } from "../catalog"
import { useDocsTheme } from "../theme"
import { CategoryCard, CodeBlock, PackageManager } from "../ui/code"

const CSS_IMPORT = `import "@pritish.budhiraja/ui/styles.css"`
const USAGE = `import { Button, FramedContainer } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"

export function App() {
  return (
    <html data-theme="portfolio">
      <FramedContainer>
        <OriginButton>Get started</OriginButton>
        <Button variant="outline">Quiet</Button>
      </FramedContainer>
    </html>
  )
}`

export function HomePage() {
  const { mode, setMode } = useDocsTheme()

  return (
    <article className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            @pritish.budhiraja/ui · 0.4.0
          </p>
          <h1 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            An editorial React system for personal products.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Hatch is the design system behind{" "}
            <a
              className="underline-offset-2 hover:underline"
              href="https://www.pritishbudhiraja.com"
            >
              pritishbudhiraja.com
            </a>
            . Dashed frames, hatch rules, handwritten notes, and origin-ripple actions — built to
            reuse in Epoch and anything after, without coupling to Next.js or product domain
            widgets.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/components">
              <OriginButton>Explore components</OriginButton>
            </Link>
            <Link to="/agents">
              <Button variant="outline">Agents</Button>
            </Link>
          </div>
        </div>
        <Surface className="relative p-5">
          <EditorialAnnotation>the signature set</EditorialAnnotation>
          <p className="font-serif text-2xl italic">Hatch</p>
          <p className="mt-1 text-sm text-muted-foreground">Calm chrome. One loud action.</p>
          <HatchDivider className="my-4" />
          <div className="flex flex-wrap items-center gap-2">
            <OriginButton>OriginButton</OriginButton>
            <Button variant="outline">Button</Button>
            <ThemeToggle
              theme={mode}
              setTheme={(next) => setMode(next === "dark" ? "dark" : "light")}
            />
          </div>
        </Surface>
      </div>

      <section id="install" className="scroll-mt-20 space-y-4">
        <EditorialHeading as="h2">Install from npm</EditorialHeading>
        <Text tone="muted">
          Tokens ship with the UI package. Install from npm and import the stylesheet once.
        </Text>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              01 · Package
            </p>
            <PackageManager
              packages={{
                pnpm: "pnpm add @pritish.budhiraja/ui",
                npm: "npm install @pritish.budhiraja/ui",
                bun: "bun add @pritish.budhiraja/ui",
              }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              02 · Styles once
            </p>
            <CodeBlock code={CSS_IMPORT} label="CSS import" />
          </div>
        </div>
        <CodeBlock code={USAGE} label="Minimal usage" />
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Set <code>data-theme="portfolio"</code> or <code>data-theme="epoch"</code> on the
            document. Toggle the <code>dark</code> class for mode.
          </li>
          <li>
            Load fonts in the host. Override <code>--pb-font-sans</code>,{" "}
            <code>--pb-font-serif</code>, <code>--pb-font-display</code>, and{" "}
            <code>--pb-font-hand</code> if needed.
          </li>
          <li>
            Import motion from <code>@pritish.budhiraja/ui/motion</code> only for OriginButton and
            ScrollProgress. ThemeToggle is controlled — you own storage.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <EditorialHeading as="h2">What we built</EditorialHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <Built
            title="Tokens, two palettes"
            body="Semantic CSS variables. Portfolio is the live grayscale site. Epoch is a candidate green editorial theme — not a second component tree."
          />
          <Built
            title="Primitives that stay quiet"
            body="Buttons, fields, overlays, tables, and shells. Radix where it earns the dependency. No Next.js APIs inside the library."
          />
          <Built
            title="Signature identity"
            body="FramedContainer, HatchDivider, EditorialAnnotation, CalendarHeatmap, OriginButton, ThemeToggle. These are why Hatch is not a template."
          />
          <Built
            title="A real consumer"
            body="The portfolio installs Hatch from npm. Epoch domain widgets (SeasonCard, FocusTimer, TaskRow) stay in Epoch until reuse is proven."
          />
        </div>
      </section>

      <section className="space-y-4">
        <EditorialHeading as="h2">Browse by category</EditorialHeading>
        <Text tone="muted">Each card is a reason to exist, not a dump of every export.</Text>
        <div className="grid gap-3 sm:grid-cols-2">
          {CATALOG.map((category, index) => (
            <CategoryCard
              key={category.id}
              index={String(index + 1).padStart(2, "0")}
              title={category.title}
              purpose={category.purpose}
              href={`/components#${category.id}`}
            >
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {category.items.map((item) => item.name).join(" · ")}
              </p>
            </CategoryCard>
          ))}
        </div>
      </section>
    </article>
  )
}

function Built({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-dashed border-border p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
