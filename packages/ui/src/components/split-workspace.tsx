"use client"

import type { ReactNode } from "react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { cn } from "../lib/cn"

export interface SplitWorkspaceProps {
  nav?: ReactNode
  main: ReactNode
  inspector?: ReactNode
  defaultNavSize?: number | string
  defaultInspectorSize?: number | string
  className?: string
}

export function SplitPane({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Group orientation="horizontal" className={cn("h-full min-h-64 w-full", className)}>
      {children}
    </Group>
  )
}

export function ResizablePanel({
  children,
  defaultSize,
  minSize = "12",
  className,
}: {
  children: ReactNode
  defaultSize?: number | string
  minSize?: number | string
  className?: string
}) {
  return (
    <Panel defaultSize={defaultSize} minSize={minSize} className={cn("min-w-0", className)}>
      {children}
    </Panel>
  )
}

export function SplitWorkspace({
  nav,
  main,
  inspector,
  defaultNavSize = "20",
  defaultInspectorSize = "24",
  className,
}: SplitWorkspaceProps) {
  return (
    <SplitPane className={className}>
      {nav ? (
        <>
          <ResizablePanel defaultSize={defaultNavSize} minSize="12">
            {nav}
          </ResizablePanel>
          <Separator className="w-px bg-border" />
        </>
      ) : null}
      <ResizablePanel defaultSize={inspector ? "56" : "80"} minSize="30">
        {main}
      </ResizablePanel>
      {inspector ? (
        <>
          <Separator className="w-px bg-border" />
          <ResizablePanel defaultSize={defaultInspectorSize} minSize="16">
            {inspector}
          </ResizablePanel>
        </>
      ) : null}
    </SplitPane>
  )
}
