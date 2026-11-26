"use client"

import type { Components } from "react-markdown"
import Markdown from "react-markdown"
import { cn } from "../lib/cn"

const components: Components = {
  h1: ({ children }) => <h1 className="font-serif text-3xl italic">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-6 text-xl font-medium tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-4 text-lg font-medium">{children}</h3>,
  p: ({ children }) => <p className="mt-3 text-sm leading-relaxed text-foreground">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">{children}</ol>,
  a: ({ href, children }) => (
    <a href={href} className="underline underline-offset-2">
      {children}
    </a>
  ),
  code: ({ children, className }) =>
    className ? (
      <code className="block overflow-x-auto rounded-md bg-muted p-3 font-mono text-[12px] text-muted-foreground">
        {children}
      </code>
    ) : (
      <code className="rounded-sm bg-muted px-1 font-mono text-[12px]">{children}</code>
    ),
}

export interface MarkdownRendererProps {
  markdown: string
  className?: string
}

export function MarkdownRenderer({ markdown, className }: MarkdownRendererProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <Markdown components={components}>{markdown}</Markdown>
    </div>
  )
}
