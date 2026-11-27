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

function percentOf(size: number | string) {
  if (typeof size !== "string") return null
  const match = /^\s*(\d+(?:\.\d+)?)\s*%?\s*$/.exec(size)
  return match ? Number(match[1]) : null
}

// Defaults must add up to 100 or react-resizable-panels rescales every panel.
// A pixel or other-unit side cannot be summed, so main then takes what is left.
function mainSize(sides: (number | string)[]) {
  let total = 0
  for (const side of sides) {
    const value = percentOf(side)
    if (value === null) return undefined
    total += value
  }
  return String(100 - total)
}

export function SplitWorkspace({
  nav,
  main,
  inspector,
  defaultNavSize = "20",
  defaultInspectorSize = "24",
  className,
}: SplitWorkspaceProps) {
  const sides = [nav ? defaultNavSize : null, inspector ? defaultInspectorSize : null].filter(
    (side) => side !== null,
  )
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
      <ResizablePanel defaultSize={mainSize(sides)} minSize="30">
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
