import { AppShell, Navbar, NavbarBrand, Sidebar, SidebarItem } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "app-shell",
  name: "AppShell",
  when: "Sidebar plus main.",
  title: "AppShell",
  kicker: "Navigation",
  description: "Header, optional sidebar, main. Layout only — no product routes.",
  preview: (
    <Preview code={`<AppShell header={…} sidebar={…}>…</AppShell>`} className="p-0">
      <AppShell
        className="w-full"
        header={
          <Navbar>
            <NavbarBrand>App</NavbarBrand>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarItem current>Home</SidebarItem>
          </Sidebar>
        }
      >
        Main
      </AppShell>
    </Preview>
  ),
  a11y: "main landmark wraps children.",
  props: [
    { name: "header", type: "ReactNode", description: "Top bar" },
    { name: "sidebar", type: "ReactNode", description: "Aside" },
  ],
}
