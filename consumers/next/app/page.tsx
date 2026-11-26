import { EditorialHeading } from "@pritish.budhiraja/ui"
import { ClientChrome } from "./client-chrome"
import { SsrNote } from "./ssr-note"

export default function Page() {
  return (
    <div className="min-h-svh bg-background p-8">
      <EditorialHeading>Hatch published Next consumer</EditorialHeading>
      <SsrNote />
      <ClientChrome />
    </div>
  )
}
