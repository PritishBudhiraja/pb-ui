import { Sidebar, SidebarItem } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "sidebar",
  name: "Sidebar",
  when: "Sectioned nav list.",
  title: "Sidebar",
  kicker: "Navigation",
  description: "Generic aside. Not an Epoch product chrome.",
  preview: (
    <Preview code={`<Sidebar><SidebarItem current>Overview</SidebarItem></Sidebar>`}>
      <Sidebar>
        <SidebarItem current>Overview</SidebarItem>
        <SidebarItem>Settings</SidebarItem>
      </Sidebar>
    </Preview>
  ),
  a11y: "Items are buttons. current sets aria-current=page.",
  props: [{ name: "current", type: "boolean", description: "Active item" }],
}
