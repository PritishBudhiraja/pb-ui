import { EditorialHeading, Text } from "@pritish.budhiraja/ui"
import { Link } from "react-router-dom"
import { CATALOG } from "../catalog"
import { PageHeader } from "../ui/preview"

export function CatalogPage() {
  return (
    <article className="space-y-12">
      <PageHeader
        kicker="Components"
        title="A catalog with reasons, not a dump of every export."
        description="Each category exists because a consumer needed it. Signature first — that is Hatch. Primitives exist so signature pieces do not reinvent a button."
      />
      {CATALOG.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-20 space-y-4">
          <EditorialHeading as="h2">{category.title}</EditorialHeading>
          <Text tone="muted">{category.purpose}</Text>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-dashed border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Component</th>
                  <th className="py-2 font-medium">When to use</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item.slug} className="border-b border-dashed border-border align-top">
                    <td className="py-2 pr-4">
                      <Link
                        className="font-medium underline-offset-2 hover:underline"
                        to={`/components/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 text-muted-foreground">{item.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </article>
  )
}
