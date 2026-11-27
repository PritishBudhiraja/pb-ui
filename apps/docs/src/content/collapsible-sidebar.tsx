import { Button, Sidebar, SidebarItem } from "@pritish.budhiraja/ui"
import { useState } from "react"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

function CollapsedSidebarPreview() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Preview code={`<Sidebar collapsed={collapsed}>…</Sidebar>`}>
      <div className="flex w-full items-start gap-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? "Expand" : "Collapse"}
        </Button>
        <Sidebar collapsed={collapsed}>
          <SidebarItem current>{collapsed ? "In" : "Inbox"}</SidebarItem>
          <SidebarItem>{collapsed ? "Set" : "Settings"}</SidebarItem>
        </Sidebar>
      </div>
    </Preview>
  )
}

export const doc: ComponentDoc = {
  slug: "collapsible-sidebar",
  name: "CollapsibleSidebar",
  when: "Sidebar with a collapsed rail.",
  title: "CollapsibleSidebar",
  kicker: "Navigation",
  description: "Sidebar with collapsed. Alias of Sidebar.",
  preview: <CollapsedSidebarPreview />,
  a11y: "Host should label the toggle.",
  props: [
    { name: "collapsed", type: "boolean", defaultValue: "false", description: "Narrow rail" },
  ],
}
