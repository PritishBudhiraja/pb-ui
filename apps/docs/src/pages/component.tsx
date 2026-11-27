import { use } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { loadDoc } from "../content/docs"
import { PageHeader, PropTable } from "../ui/preview"

export function ComponentPage() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/components" replace />
  return <ComponentDocView key={slug} slug={slug} />
}

function ComponentDocView({ slug }: { slug: string }) {
  const doc = use(loadDoc(slug))
  if (!doc) return <Navigate to="/components" replace />
  const why = doc.why
  const whenNot = doc.whenNot
  const related = doc.related

  return (
    <article className="space-y-8">
      <PageHeader kicker={doc.kicker} title={doc.title} description={doc.description} />
      {why ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Why it exists</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{why}</p>
        </section>
      ) : null}
      {whenNot ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">When not to use it</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{whenNot}</p>
        </section>
      ) : null}
      {doc.preview}
      <section className="space-y-3">
        <h2 className="text-sm font-medium">API</h2>
        <PropTable rows={doc.props} />
      </section>
      <section className="space-y-2">
        <h2 className="text-sm font-medium">Accessibility</h2>
        <p className="text-sm text-muted-foreground">{doc.a11y}</p>
      </section>
      {related && related.length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Related</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  className="underline-offset-2 hover:underline"
                  to={`/components/${item.slug}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
