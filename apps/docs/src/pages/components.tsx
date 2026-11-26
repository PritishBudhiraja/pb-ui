import {
  Button,
  CalendarHeatmap,
  Checkbox,
  CommandPalette,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditorialAnnotation,
  EditorialHeading,
  EmptyState,
  FramedContainer,
  HatchDivider,
  Heading,
  IconButton,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Surface,
  Text,
  Textarea,
  ThemeToggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
  toHeatmapLevel,
} from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { Search } from "lucide-react"
import type { ReactNode } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useDocsTheme } from "../theme"
import { PageHeader, Preview, PropTable } from "../ui/preview"
import { EXPANSION_DOCS } from "./expansion-docs"
import { EXTRA_DOCS } from "./extra-docs"

export interface ComponentDoc {
  title: string
  kicker: string
  description: string
  preview: ReactNode
  code?: string
  a11y: string
  why?: string
  whenNot?: string
  related?: Array<{ slug: string; name: string }>
  props: Array<{ name: string; type: string; defaultValue?: string; description: string }>
}

function ButtonDoc() {
  return (
    <Preview
      code={`<Button>Save</Button>
<Button variant="outline">Outline</Button>
<Button size="sm" disabled>Disabled</Button>`}
    >
      <Button>Save</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm" disabled>
        Disabled
      </Button>
    </Preview>
  )
}

export const CORE_DOCS: Record<string, ComponentDoc> = {
  button: {
    title: "Button",
    kicker: "Primitive",
    why: "The quiet action control. Variants and sizes cover most product UI without inventing another button.",
    whenNot:
      "Use OriginButton for the one CTA that should feel authored. Use LinkButton for text-style links. Use IconButton when there is no visible label besides the icon.",
    related: [
      { slug: "origin-button", name: "OriginButton" },
      { slug: "icon-button", name: "IconButton" },
      { slug: "link-button", name: "LinkButton" },
    ],
    description:
      "Standard button with variants and sizes. Use OriginButton when the action should carry the signature ripple.",
    preview: <ButtonDoc />,
    code: "",
    a11y: "Native button. Focus-visible ring. Disabled is not focusable via pointer. asChild uses Radix Slot.",
    props: [
      {
        name: "variant",
        type: "default | destructive | outline | secondary | ghost | link",
        defaultValue: "default",
        description: "Visual style",
      },
      {
        name: "size",
        type: "default | sm | lg | icon",
        defaultValue: "default",
        description: "Height and padding",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Merge props onto the child",
      },
    ],
  },
  "icon-button": {
    title: "IconButton",
    kicker: "Primitive",
    description: "Button size=icon with a required accessible name.",
    preview: (
      <Preview code={`<IconButton label="Search"><Search /></IconButton>`}>
        <IconButton label="Search">
          <Search />
        </IconButton>
      </Preview>
    ),
    code: "",
    a11y: "label is required and becomes aria-label.",
    props: [{ name: "label", type: "string", description: "Accessible name" }],
  },
  input: {
    title: "Input",
    kicker: "Form",
    description: "Native input with tokenized focus ring.",
    preview: (
      <Preview code={`<Input placeholder="Email" />`}>
        <div className="grid w-72 gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" />
        </div>
      </Preview>
    ),
    code: "",
    a11y: "Pair with Label via htmlFor. Native constraint validation still applies.",
    props: [
      { name: "...", type: "InputHTMLAttributes", description: "All native input attributes" },
    ],
  },
  textarea: {
    title: "Textarea",
    kicker: "Form",
    description: "Native textarea, min-height 6rem.",
    preview: (
      <Preview code={`<Textarea placeholder="Note" />`}>
        <Textarea className="w-72" placeholder="Optional note" />
      </Preview>
    ),
    code: "",
    a11y: "Pair with Label. Resize is native.",
    props: [
      {
        name: "...",
        type: "TextareaHTMLAttributes",
        description: "All native textarea attributes",
      },
    ],
  },
  checkbox: {
    title: "Checkbox",
    kicker: "Form",
    description: "Radix checkbox with a check indicator.",
    preview: (
      <Preview code={`<Checkbox id="x" /><Label htmlFor="x">Subscribe</Label>`}>
        <div className="flex items-center gap-2">
          <Checkbox id="docs-check" />
          <Label htmlFor="docs-check">Subscribe</Label>
        </div>
      </Preview>
    ),
    code: "",
    a11y: "Space toggles. Disabled uses opacity and not-allowed cursor.",
    props: [{ name: "checked", type: "boolean", description: "Controlled checked state" }],
  },
  label: {
    title: "Label",
    kicker: "Form",
    description: "Radix label primitive.",
    preview: (
      <Preview code={`<Label htmlFor="name">Name</Label>`}>
        <Label>Name</Label>
      </Preview>
    ),
    code: "",
    a11y: "Clicking the label focuses the associated control.",
    props: [{ name: "htmlFor", type: "string", description: "Control id" }],
  },
  text: {
    title: "Text",
    kicker: "Typography",
    description: "Paragraph with tone tokens.",
    preview: (
      <Preview code={`<Text tone="muted">Secondary copy</Text>`}>
        <div>
          <Text>Default</Text>
          <Text tone="muted">Muted</Text>
        </div>
      </Preview>
    ),
    code: "",
    a11y: "Renders a p. Do not nest headings inside it.",
    props: [
      {
        name: "tone",
        type: "default | muted | editorial",
        defaultValue: "default",
        description: "Color",
      },
    ],
  },
  heading: {
    title: "Heading",
    kicker: "Typography",
    description: "Tracking-tight sans headings. EditorialHeading is the serif italic display.",
    preview: (
      <Preview
        code={`<Heading size="lg">Title</Heading>\n<EditorialHeading>Calm.</EditorialHeading>`}
      >
        <div>
          <Heading size="lg">Title</Heading>
          <EditorialHeading>Calm.</EditorialHeading>
        </div>
      </Preview>
    ),
    code: "",
    a11y: "as selects the heading level. Do not skip levels in a page.",
    props: [
      { name: "as", type: "h1–h6", defaultValue: "h2", description: "Element" },
      { name: "size", type: "sm | md | lg | xl", defaultValue: "md", description: "Visual size" },
    ],
  },
  dialog: {
    title: "Dialog",
    kicker: "Overlay",
    description: "Radix dialog with portfolio overlay blur.",
    preview: (
      <Preview
        code={`<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent>…</DialogContent></Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm</DialogTitle>
              <DialogDescription>Focus is trapped until you close.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Preview>
    ),
    code: "",
    a11y: "Escape closes. Focus returns to the trigger. Title is required for the accessible name.",
    props: [{ name: "open", type: "boolean", description: "Controlled open state" }],
  },
  popover: {
    title: "Popover",
    kicker: "Overlay",
    description: "Positioned panel.",
    preview: (
      <Preview
        code={`<Popover><PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger><PopoverContent>…</PopoverContent></Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Composable overlay content.</PopoverContent>
        </Popover>
      </Preview>
    ),
    code: "",
    a11y: "Radix focus and dismiss behavior.",
    props: [{ name: "open", type: "boolean", description: "Controlled open state" }],
  },
  tooltip: {
    title: "Tooltip",
    kicker: "Overlay",
    description: "Wrap the tree in TooltipProvider.",
    preview: (
      <Preview code={`<TooltipProvider><Tooltip>…</Tooltip></TooltipProvider>`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Keyboard accessible</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Preview>
    ),
    code: "",
    a11y: "Appears on hover and focus.",
    props: [{ name: "delayDuration", type: "number", description: "Provider delay" }],
  },
  "command-palette": {
    title: "CommandPalette",
    kicker: "Overlay",
    description:
      "Generic cmdk dialog. This docs site uses it for navigation. No hardcoded portfolio routes.",
    preview: (
      <Preview code={`<CommandPalette items={…} onSelect={…} />`}>
        <CommandPalette
          items={[
            { id: "a", label: "Introduction", group: "Docs" },
            { id: "b", label: "Button", group: "Components" },
          ]}
          onSelect={() => undefined}
        />
      </Preview>
    ),
    code: "",
    a11y: "⌘K / Ctrl+K. Dialog is labelled. Trigger exposes aria-expanded. With two palettes on a page, one press opens only the first.",
    props: [
      { name: "items", type: "CommandPaletteItem[]", description: "Searchable entries" },
      {
        name: "shortcut",
        type: "string | false",
        description: "Letter used with ⌘ / Ctrl. Default k; false turns it off",
      },
      { name: "onSelect", type: "(item) => void", description: "Called after close" },
    ],
  },
  toast: {
    title: "Toast",
    kicker: "Feedback",
    description: "Radix toast with a 3-item queue and 4s removal. Mount Toaster once.",
    preview: (
      <Preview code={`toast({ title: "Saved", description: "Done." })`}>
        <Button
          onClick={() => toast({ title: "Saved", description: "Changes stored in this demo." })}
        >
          Show toast
        </Button>
      </Preview>
    ),
    code: "",
    a11y: "Viewport is a live region. Close button appears on hover and focus.",
    props: [
      { name: "title", type: "ReactNode", description: "Heading" },
      {
        name: "variant",
        type: "default | destructive",
        defaultValue: "default",
        description: "Tone",
      },
    ],
  },
  "empty-state": {
    title: "EmptyState",
    kicker: "Feedback",
    description: "Dashed first-run panel.",
    preview: (
      <Preview code={`<EmptyState title="Nothing here" description="Add a record." />`}>
        <EmptyState
          className="w-full"
          title="Nothing here yet"
          description="Use this on first-run screens."
        />
      </Preview>
    ),
    code: "",
    a11y: "Plain text. Pass actions that are real buttons.",
    props: [
      { name: "title", type: "string", description: "Primary line" },
      { name: "action", type: "ReactNode", description: "Optional CTA" },
    ],
  },
  "origin-button": {
    title: "OriginButton",
    kicker: "Signature",
    why: "This is the Hatch CTA. The ripple starts at the pointer so the action feels physical, not a generic fill.",
    whenNot:
      "Do not sprinkle OriginButton on every toolbar control. Quiet Button/IconButton belong there. Always import from the motion entry.",
    related: [
      { slug: "button", name: "Button" },
      { slug: "scroll-progress", name: "ScrollProgress" },
    ],
    description:
      "Cursor-origin ripple CTA. Import from @pritish.budhiraja/ui/motion. Filled and outline share one implementation.",
    preview: (
      <Preview
        code={`import { OriginButton } from "@pritish.budhiraja/ui/motion"

<OriginButton>Primary</OriginButton>
<OriginButton variant="outline">Secondary</OriginButton>`}
      >
        <OriginButton>Primary action</OriginButton>
        <OriginButton variant="outline">Secondary</OriginButton>
      </Preview>
    ),
    code: "",
    a11y: "Focus-visible ring. Keyboard focus also expands the ripple from the center. Reduced motion skips the overlay.",
    props: [
      {
        name: "variant",
        type: "filled | outline",
        defaultValue: "filled",
        description: "Fill vs invert-on-hover",
      },
      { name: "href", type: "string", description: "Renders an anchor when set" },
    ],
  },
  "framed-container": {
    title: "FramedContainer",
    kicker: "Signature",
    why: "The page chrome from the portfolio: a dashed column with gutter hairlines. Hosts wrap a route in this instead of inventing a layout.",
    whenNot:
      "Use Surface or Card for inner panels. Do not nest FramedContainer inside another full-page frame.",
    related: [
      { slug: "surface", name: "Surface" },
      { slug: "hatch-divider", name: "HatchDivider" },
    ],
    description: "Dashed column with gutter hairlines. Generalization of SiteFrame.",
    preview: (
      <Preview code={`<FramedContainer>…</FramedContainer>`} className="p-0">
        <div className="h-40 w-full overflow-hidden">
          <FramedContainer className="min-h-0">
            <p className="p-6 text-sm text-muted-foreground">Column + gutters</p>
          </FramedContainer>
        </div>
      </Preview>
    ),
    code: "",
    a11y: "Decorative pseudo-elements are pointer-events none.",
    props: [
      { name: "wide", type: "boolean", defaultValue: "false", description: "1120px vs 720px" },
    ],
  },
  "hatch-divider": {
    title: "HatchDivider",
    kicker: "Signature",
    why: "The hatched section rule is the visual beat between editorial blocks. It is not a generic hr.",
    whenNot:
      "Use Separator inside dense chrome (menus, toolbars). HatchDivider is for page sections.",
    related: [{ slug: "separator", name: "Separator" }],
    description: "The hatched section rule from the portfolio.",
    preview: (
      <Preview code={`<HatchDivider />`}>
        <div className="w-full">
          <HatchDivider />
        </div>
      </Preview>
    ),
    code: "",
    a11y: "aria-hidden. Do not use it as the only heading separator without a real heading.",
    props: [{ name: "className", type: "string", description: "Optional layout classes" }],
  },
  "editorial-annotation": {
    title: "EditorialAnnotation",
    kicker: "Signature",
    why: "Handwritten asides are part of the voice. They sit in the margin on wide screens so the column stays clean.",
    whenNot:
      "Not an Alert, toast, or error. Operational messages use Alert. Parent must be relative.",
    related: [{ slug: "alert", name: "Alert" }],
    description:
      "Handwritten margin note. Visible from the xl breakpoint. Parent must be relative.",
    preview: (
      <Preview
        code={`<div className="relative"><EditorialAnnotation>shipped</EditorialAnnotation></div>`}
      >
        <div className="relative w-full py-8">
          <EditorialAnnotation className="xl:static xl:translate-x-0">
            shipped in the open
          </EditorialAnnotation>
        </div>
      </Preview>
    ),
    code: "",
    a11y: "aria-hidden. Do not put unique information only in the annotation.",
    props: [
      { name: "side", type: "left | right", defaultValue: "right", description: "Which margin" },
      { name: "rotate", type: "number", defaultValue: "-8", description: "Degrees" },
    ],
  },
  "calendar-heatmap": {
    title: "CalendarHeatmap",
    why: "Contribution-style year grid with a text summary so the data is not trapped in color.",
    whenNot: "Not a DatePicker. Missing days should be empty, not guessed.",
    related: [{ slug: "date-picker", name: "DatePicker" }],
    kicker: "Signature",
    description:
      "Generic contribution-style grid. Missing dates between first and last are filled. No GitHub fetch.",
    preview: (
      <Preview code={`<CalendarHeatmap days={days} from="2026-01-01" to="2026-01-14" />`}>
        <CalendarHeatmap
          className="w-full"
          days={Array.from({ length: 14 }, (_, i) => ({
            date: `2026-01-${String(i + 1).padStart(2, "0")}`,
            count: i % 4,
            level: toHeatmapLevel(i % 5),
          }))}
          from="2026-01-01"
          to="2026-01-14"
        />
      </Preview>
    ),
    code: "",
    a11y: "sr-only summary plus role=img on the grid. Prefer toHeatmapLevel() instead of asserting levels.",
    props: [
      { name: "days", type: "HeatmapDay[]", description: "Sparse or contiguous days" },
      { name: "getDayLabel", type: "(day) => string", description: "title text" },
    ],
  },
  "theme-toggle": {
    title: "ThemeToggle",
    kicker: "Signature",
    why: "The circular view-transition clip is the Hatch theme change. The host owns storage so Next, Vite, and extensions can disagree on persistence.",
    whenNot:
      "Do not wrap next-themes inside the library. Pass theme, resolvedTheme, and setTheme from the host.",
    related: [{ slug: "icon-button", name: "IconButton" }],
    description:
      "Circular View Transition clip. Pass theme and setTheme. This page uses the docs theme store.",
    preview: <ThemeTogglePreview />,
    code: "",
    a11y: "IconButton with aria-pressed for dark mode. Reduced motion skips the clip-path animation.",
    props: [
      { name: "theme", type: "string", description: "light | dark | system" },
      {
        name: "resolvedTheme",
        type: "string",
        description: "Actual light or dark when theme is system (for example from next-themes)",
      },
      { name: "setTheme", type: '(theme: "light" | "dark") => void', description: "Host setter" },
      { name: "label", type: "string", description: "Accessible name. Default Toggle theme" },
    ],
  },
  "scroll-progress": {
    title: "ScrollProgress",
    kicker: "Signature",
    why: "A thin reading bar for long documents. Optional — this docs layout does not mount it globally so it does not fight the header.",
    whenNot: "Import from the motion entry. Skip it on short marketing pages.",
    related: [{ slug: "origin-button", name: "OriginButton" }],
    description:
      "Fixed 3px bar. Import from motion. Optional on long article pages — this docs layout does not mount it globally so it does not fight the header.",
    preview: (
      <Preview code={`import { ScrollProgress } from "@pritish.budhiraja/ui/motion"`}>
        <Text tone="muted">Mount once in the host app shell.</Text>
      </Preview>
    ),
    code: "",
    a11y: "aria-hidden. Reduced motion keeps the bar fully scaled.",
    props: [{ name: "className", type: "string", description: "Position overrides" }],
  },
  surface: {
    title: "Surface",
    kicker: "Primitive",
    why: "Dashed inner panel from the portfolio chrome. Smaller than FramedContainer, simpler than Card.",
    whenNot:
      "Use Card when you need header, title, and footer slots. Use FramedContainer for the page.",
    related: [
      { slug: "card", name: "Card" },
      { slug: "framed-container", name: "FramedContainer" },
    ],
    description: "Dashed card from the portfolio chrome.",
    preview: (
      <Preview code={`<Surface className="p-4">Content</Surface>`}>
        <Surface className="p-4">Dashed surface</Surface>
      </Preview>
    ),
    code: "",
    a11y: "A div. Put a heading inside when it is a region.",
    props: [
      {
        name: "dashed",
        type: "boolean",
        defaultValue: "true",
        description: "Dashed vs solid border",
      },
    ],
  },
}

function ThemeTogglePreview() {
  const { mode, setMode } = useDocsTheme()
  return (
    <Preview code={`<ThemeToggle theme={theme} setTheme={setTheme} />`}>
      <ThemeToggle theme={mode} setTheme={(next) => setMode(next === "dark" ? "dark" : "light")} />
    </Preview>
  )
}

export function ComponentPage() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/components" replace />
  const extra = EXTRA_DOCS[slug] ?? EXPANSION_DOCS[slug]
  const doc = CORE_DOCS[slug] ?? extra
  if (!doc) return <Navigate to="/components" replace />
  const why = doc.why
  const whenNot = doc.whenNot
  const related = doc.related

  return (
    <article className="space-y-8">
      <PageHeader kicker={doc.kicker} title={doc.title} description={doc.description} />
      {why ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Why it exists</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{why}</p>
        </section>
      ) : null}
      {whenNot ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">When not to use it</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{whenNot}</p>
        </section>
      ) : null}
      {doc.preview}
      <section className="space-y-3">
        <h2 className="text-sm font-medium">API</h2>
        <PropTable rows={doc.props} />
      </section>
      <section className="space-y-2">
        <h2 className="text-sm font-medium">Accessibility</h2>
        <p className="text-sm text-muted-foreground">{doc.a11y}</p>
      </section>
      {related && related.length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Related</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  className="underline-offset-2 hover:underline"
                  to={`/components/${item.slug}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
