import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "breadcrumb",
  name: "Breadcrumb",
  when: "Path back to parent pages.",
  title: "Breadcrumb",
  kicker: "Navigation",
  description: "Path of links. asChild on BreadcrumbLink for routers.",
  preview: (
    <Preview code={`<Breadcrumb>…</Breadcrumb>`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tabs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Preview>
  ),
  a11y: "nav labelled Breadcrumb. Current page uses aria-current=page.",
  props: [{ name: "asChild", type: "boolean", description: "On BreadcrumbLink" }],
}
