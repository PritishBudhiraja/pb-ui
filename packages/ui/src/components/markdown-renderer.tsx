"use client"

import type { Components } from "react-markdown"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "../lib/cn"

export function markdownImageHref(src: unknown, allowImages: boolean) {
  if (!allowImages) return null
  if (typeof src !== "string") return null
  if (!/^https:\/\//i.test(src)) return null
  return src
}

function markdownComponents(allowImages: boolean): Components {
  return {
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
    del: ({ children }) => <del className="text-muted-foreground">{children}</del>,
    table: ({ children }) => <table className="mt-3 w-full text-left text-sm">{children}</table>,
    th: ({ children }) => (
      <th className="border-b border-border px-2 py-1 font-medium">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-b border-dashed border-border px-2 py-1">{children}</td>
    ),
    code: ({ children, className }) =>
      className ? (
        <code className="block overflow-x-auto rounded-md bg-muted p-3 font-mono text-[12px] text-muted-foreground">
          {children}
        </code>
      ) : (
        <code className="rounded-sm bg-muted px-1 font-mono text-[12px]">{children}</code>
      ),
    img: ({ src, alt }) => {
      const href = markdownImageHref(src, allowImages)
      if (!href) return null
      return <img src={href} alt={alt || ""} referrerPolicy="no-referrer" />
    },
  }
}

export interface MarkdownRendererProps {
  markdown: string
  className?: string
  allowImages?: boolean
}

export function MarkdownRenderer({
  markdown,
  className,
  allowImages = false,
}: MarkdownRendererProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents(allowImages)}>
        {markdown}
      </Markdown>
    </div>
  )
}
