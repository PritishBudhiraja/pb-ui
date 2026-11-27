import { cn, EditorialHeading, Text } from "@pritish.budhiraja/ui"
import { use } from "react"
import { Link } from "react-router-dom"
import { CATALOG } from "../content"
import { loadAllDocs } from "../content/docs"
import { PageHeader } from "../ui/preview"

const WIDE = new Set([
  "week-calendar",
  "time-grid",
  "calendar-event",
  "split-workspace",
  "app-shell",
  "weekly-activity-grid",
  "rich-text-editor",
  "stacked-bar-chart",
  "area-chart",
  "donut-chart",
  "virtual-list",
  "calendar-heatmap",
  "data-table",
  "table",
  "navbar",
])

export function CatalogPage() {
  const docs = use(loadAllDocs())
  return (
    <article className="space-y-16">
      <PageHeader
        kicker="Components"
        title="Everything in Hatch, rendered."
        description="Each block is the real component running in this site. Open a name for API notes."
      />
      {CATALOG.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-20 space-y-4">
          <EditorialHeading as="h2">{category.title}</EditorialHeading>
          <Text tone="muted">{category.purpose}</Text>
          <div className="grid gap-4 md:grid-cols-2">
            {category.items.map((item) => {
              const preview = docs[item.slug]?.preview
              return (
                <article
                  key={item.slug}
                  id={item.slug}
                  className={cn("min-w-0 scroll-mt-20", WIDE.has(item.slug) && "md:col-span-2")}
                >
                  <div className="overflow-hidden rounded-md border border-dashed border-border">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-3">
                      <Link
                        className="text-sm font-medium underline-offset-2 hover:underline"
                        to={`/components/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.when}</p>
                    </div>
                    <div className="mt-2 [&>div]:rounded-none [&>div]:border-0 [&>div]:border-t [&>div]:border-dashed [&>div>div.relative]:hidden">
                      {preview}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </article>
  )
}
