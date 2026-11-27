import { Button, MobileNavigation, Navbar, NavbarBrand, NavbarSpacer } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "navbar",
  name: "Navbar",
  when: "Header shell with brand and spacer.",
  title: "Navbar",
  kicker: "Navigation",
  description: "Top bar. Pair with MobileNavigation below md.",
  preview: (
    <Preview code={`<Navbar><NavbarBrand>Hatch</NavbarBrand></Navbar>`} className="p-0">
      <Navbar className="w-full">
        <NavbarBrand>Hatch</NavbarBrand>
        <NavbarSpacer />
        <MobileNavigation>
          <Button variant="ghost" className="justify-start">
            Docs
          </Button>
        </MobileNavigation>
      </Navbar>
    </Preview>
  ),
  a11y: "header landmark. Mobile sheet has a title.",
  props: [{ name: "children", type: "ReactNode", description: "Brand, links, actions" }],
}
