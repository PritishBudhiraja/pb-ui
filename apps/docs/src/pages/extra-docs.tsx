import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AppShell,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DataTable,
  DatePicker,
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ErrorState,
  FilterBar,
  FormField,
  Grid,
  KeyboardShortcut,
  LinkButton,
  LoadingButton,
  MobileNavigation,
  Navbar,
  NavbarBrand,
  NavbarSpacer,
  Pagination,
  PaginationNext,
  PaginationPrevious,
  ProgressBar,
  ProgressRing,
  RadioGroup,
  RadioGroupItem,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarItem,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  StatCard,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Timeline,
  TimelineItem,
  TimePicker,
} from "@pritish.budhiraja/ui"
import type { ReactNode } from "react"
import { useState } from "react"
import { Preview } from "../ui/preview"

export interface ExtraDoc {
  title: string
  kicker: string
  description: string
  preview: ReactNode
  a11y: string
  props: Array<{ name: string; type: string; defaultValue?: string; description: string }>
}

function SelectPreview() {
  return (
    <Preview
      code={`<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>…</SelectContent></Select>`}
    >
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
        </SelectContent>
      </Select>
    </Preview>
  )
}

function ComboPreview() {
  const [value, setValue] = useState("one")
  return (
    <Preview code={`<Combobox items={…} value={value} onValueChange={setValue} />`}>
      <div className="w-56">
        <Combobox
          items={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </div>
    </Preview>
  )
}

export const EXTRA_DOCS: Record<string, ExtraDoc> = {
  select: {
    title: "Select",
    kicker: "Form",
    description: "Radix select. Use Combobox when the list should be filterable.",
    preview: <SelectPreview />,
    a11y: "Trigger is a button. Options are a listbox. Keyboard arrows and typeahead are Radix defaults.",
    props: [{ name: "value", type: "string", description: "Controlled value" }],
  },
  combobox: {
    title: "Combobox",
    kicker: "Form",
    description: "Filterable list in a popover. No extra cmdk surface — uses the existing Popover.",
    preview: <ComboPreview />,
    a11y: "Trigger has role=combobox and aria-expanded. Search input is labelled.",
    props: [
      { name: "items", type: "ComboboxItem[]", description: "Options" },
      { name: "value", type: "string", description: "Selected value" },
    ],
  },
  slider: {
    title: "Slider",
    kicker: "Form",
    description: "Radix slider on semantic tokens.",
    preview: (
      <Preview code={`<Slider defaultValue={[40]} />`}>
        <Slider className="w-56" defaultValue={[40]} />
      </Preview>
    ),
    a11y: "Thumb is keyboard reachable. Set aria-label on the root when there is no visible label.",
    props: [{ name: "defaultValue", type: "number[]", description: "Uncontrolled start" }],
  },
  "radio-group": {
    title: "RadioGroup",
    kicker: "Form",
    description: "One choice from a small set.",
    preview: (
      <Preview code={`<RadioGroup defaultValue="a"><RadioGroupItem value="a" /></RadioGroup>`}>
        <RadioGroup defaultValue="a" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="ra" />
            <label htmlFor="ra">A</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" id="rb" />
            <label htmlFor="rb">B</label>
          </div>
        </RadioGroup>
      </Preview>
    ),
    a11y: "Arrow keys move selection. Pair items with labels.",
    props: [{ name: "value", type: "string", description: "Controlled value" }],
  },
  switch: {
    title: "Switch",
    kicker: "Form",
    description:
      "Boolean toggle. Prefer Checkbox for forms that submit on/off fields with visible labels as text.",
    preview: (
      <Preview code={`<Switch />`}>
        <Switch aria-label="Notifications" />
      </Preview>
    ),
    a11y: "Space toggles. Provide aria-label or a Label.",
    props: [{ name: "checked", type: "boolean", description: "Controlled state" }],
  },
  "form-field": {
    title: "FormField",
    kicker: "Form",
    description: "Label, control, hint, and FormError in one stack. Hosts still own validation.",
    preview: (
      <Preview code={`<FormField label="Email" error="Required"><Input /></FormField>`}>
        <FormField className="w-72" label="Email" htmlFor="ff" error="Required">
          <SearchInput id="ff" />
        </FormField>
      </Preview>
    ),
    a11y: "FormError uses role=alert.",
    props: [{ name: "error", type: "string", description: "Shown as an alert" }],
  },
  "search-input": {
    title: "SearchInput",
    kicker: "Form",
    description: "type=search with a leading icon.",
    preview: (
      <Preview code={`<SearchInput placeholder="Search" />`}>
        <SearchInput className="w-72" placeholder="Search" />
      </Preview>
    ),
    a11y: "Native search input. Pair with a visible Label or aria-label.",
    props: [{ name: "...", type: "InputProps", description: "Native input attributes" }],
  },
  "date-picker": {
    title: "DatePicker",
    kicker: "Form",
    description: "Popover calendar on Hatch tokens. Value is an ISO date string. No DayPicker.",
    preview: (
      <Preview code={`<DatePicker defaultValue="2026-11-26" />`} className="min-h-96 items-start">
        <DatePicker className="w-56" defaultValue="2026-11-26" aria-label="Date" />
      </Preview>
    ),
    a11y: "Trigger is a button. Grid is buttons. Arrow through the month with the header controls. Provide aria-label or a Label.",
    props: [
      { name: "value", type: "string", description: "ISO date YYYY-MM-DD" },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Empty string clears",
      },
      { name: "min / max", type: "string", description: "Inclusive ISO bounds" },
    ],
  },
  "time-picker": {
    title: "TimePicker",
    kicker: "Form",
    description:
      "Popover hours and minutes on Hatch tokens. Value is HH:mm. No native time picker.",
    preview: (
      <Preview code={`<TimePicker defaultValue="09:30" />`} className="min-h-96 items-start">
        <TimePicker className="w-56" defaultValue="09:30" aria-label="Time" />
      </Preview>
    ),
    a11y: "Trigger is a button. Hour, minute, and period are listboxes. Choosing a minute commits. Provide a Label or aria-label.",
    props: [
      { name: "value", type: "string", description: "HH:mm" },
      {
        name: "minuteStep",
        type: "1 | 5 | 10 | 15",
        defaultValue: "5",
        description: "Minute interval",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Empty string clears",
      },
    ],
  },
  "alert-dialog": {
    title: "AlertDialog",
    kicker: "Overlay",
    description:
      "Confirm destructive work. Distinct from Dialog because cancel/action semantics are required.",
    preview: (
      <Preview code={`<AlertDialog>…</AlertDialog>`}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this?</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Preview>
    ),
    a11y: "Focus trap. Escape and cancel restore focus to the trigger.",
    props: [{ name: "open", type: "boolean", description: "Controlled open" }],
  },
  sheet: {
    title: "Sheet",
    kicker: "Overlay",
    description: "Edge panel. Drawer is an alias of the same primitive.",
    preview: (
      <Preview
        code={`<Sheet><SheetTrigger asChild><Button>Open</Button></SheetTrigger><SheetContent>…</SheetContent></Sheet>`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Panel</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Preview>
    ),
    a11y: "Same dialog semantics as Dialog. Title is required.",
    props: [
      {
        name: "side",
        type: "top | right | bottom | left",
        defaultValue: "right",
        description: "Edge",
      },
    ],
  },
  "dropdown-menu": {
    title: "DropdownMenu",
    kicker: "Overlay",
    description: "Actions attached to a control.",
    preview: (
      <Preview code={`<DropdownMenu>…</DropdownMenu>`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Preview>
    ),
    a11y: "Arrow keys, typeahead, Escape.",
    props: [{ name: "open", type: "boolean", description: "Controlled open" }],
  },
  "context-menu": {
    title: "ContextMenu",
    kicker: "Overlay",
    description: "Right-click menu. Same item styles as DropdownMenu.",
    preview: (
      <Preview code={`<ContextMenu>…</ContextMenu>`}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="rounded-md border border-dashed border-border px-8 py-6 text-sm text-muted-foreground">
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Preview>
    ),
    a11y: "Opens on contextmenu. Keyboard users should also have a visible menu trigger.",
    props: [{ name: "onOpenChange", type: "(open) => void", description: "Open callback" }],
  },
  alert: {
    title: "Alert",
    kicker: "Feedback",
    description: "Inline status, not a toast.",
    preview: (
      <Preview code={`<Alert><AlertTitle>Saved</AlertTitle></Alert>`}>
        <Alert className="w-full">
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>The host still owns persistence.</AlertDescription>
        </Alert>
      </Preview>
    ),
    a11y: "role=alert.",
    props: [
      {
        name: "variant",
        type: "default | destructive",
        defaultValue: "default",
        description: "Tone",
      },
    ],
  },
  skeleton: {
    title: "Skeleton",
    kicker: "Feedback",
    description: "Pulse placeholder. Reduced motion disables the animation.",
    preview: (
      <Preview code={`<Skeleton className="h-8 w-40" />`}>
        <Skeleton className="h-8 w-40" />
      </Preview>
    ),
    a11y: "aria-hidden. Put a live status elsewhere if loading matters.",
    props: [{ name: "className", type: "string", description: "Size" }],
  },
  spinner: {
    title: "Spinner",
    kicker: "Feedback",
    description: "Indeterminate wait.",
    preview: (
      <Preview code={`<Spinner />`}>
        <Spinner />
      </Preview>
    ),
    a11y: "role=status with a visually hidden label.",
    props: [
      { name: "label", type: "string", defaultValue: "Loading", description: "sr-only text" },
    ],
  },
  "loading-button": {
    title: "LoadingButton",
    kicker: "Feedback",
    description: "Button that disables and shows a spinner while loading.",
    preview: (
      <Preview code={`<LoadingButton loading>Save</LoadingButton>`}>
        <LoadingButton loading>Save</LoadingButton>
      </Preview>
    ),
    a11y: "aria-busy when loading. Disabled while loading.",
    props: [{ name: "loading", type: "boolean", defaultValue: "false", description: "Busy state" }],
  },
  "error-state": {
    title: "ErrorState",
    kicker: "Feedback",
    description: "Failed-fetch panel. EmptyState stays for first-run.",
    preview: (
      <Preview code={`<ErrorState title="Could not load" />`}>
        <ErrorState
          className="w-full"
          title="Could not load"
          description="Try again in a moment."
        />
      </Preview>
    ),
    a11y: "role=alert.",
    props: [{ name: "title", type: "string", description: "Primary line" }],
  },
  "progress-bar": {
    title: "ProgressBar",
    kicker: "Feedback",
    description: "Determinate bar. ProgressRing is the circular sibling.",
    preview: (
      <Preview code={`<ProgressBar value={40} />\n<ProgressRing value={40} />`}>
        <div className="flex w-full items-center gap-4">
          <ProgressBar className="flex-1" value={40} />
          <ProgressRing value={40} />
        </div>
      </Preview>
    ),
    a11y: "Radix progress root. Ring has role=img and a percent label.",
    props: [{ name: "value", type: "number", description: "0–100" }],
  },
  tabs: {
    title: "Tabs",
    kicker: "Navigation",
    description: "In-page panels.",
    preview: (
      <Preview code={`<Tabs defaultValue="one">…</Tabs>`}>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First</TabsContent>
          <TabsContent value="two">Second</TabsContent>
        </Tabs>
      </Preview>
    ),
    a11y: "Arrow keys on the tab list. Panels are labelled by their trigger.",
    props: [{ name: "defaultValue", type: "string", description: "Initial tab" }],
  },
  accordion: {
    title: "Accordion",
    kicker: "Navigation",
    description: "Stacked disclosure.",
    preview: (
      <Preview code={`<Accordion type="single" collapsible>…</Accordion>`}>
        <Accordion className="w-full" type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionContent>A disclosure region.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Preview>
    ),
    a11y: "Header is a button. Content is a region.",
    props: [{ name: "type", type: "single | multiple", description: "Open policy" }],
  },
  breadcrumb: {
    title: "Breadcrumb",
    kicker: "Navigation",
    description: "Path of links. asChild on BreadcrumbLink for routers.",
    preview: (
      <Preview code={`<Breadcrumb>…</Breadcrumb>`}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tabs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Preview>
    ),
    a11y: "nav labelled Breadcrumb. Current page uses aria-current=page.",
    props: [{ name: "asChild", type: "boolean", description: "On BreadcrumbLink" }],
  },
  pagination: {
    title: "Pagination",
    kicker: "Navigation",
    description: "Prev/next controls. Compose page numbers with PaginationButton.",
    preview: (
      <Preview code={`<Pagination><PaginationPrevious /><PaginationNext /></Pagination>`}>
        <Pagination>
          <PaginationPrevious />
          <PaginationNext />
        </Pagination>
      </Preview>
    ),
    a11y: "nav labelled Pagination. current sets aria-current=page.",
    props: [{ name: "current", type: "boolean", description: "On PaginationButton" }],
  },
  sidebar: {
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
  },
  navbar: {
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
  },
  "app-shell": {
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
  },
  badge: {
    title: "Badge",
    kicker: "Data",
    description: "Compact status chip.",
    preview: (
      <Preview code={`<Badge>New</Badge>`}>
        <Badge>New</Badge>
        <Badge variant="outline">Outline</Badge>
      </Preview>
    ),
    a11y: "A span. Do not rely on color alone.",
    props: [
      { name: "variant", type: "default | secondary | outline | destructive", description: "Tone" },
    ],
  },
  avatar: {
    title: "Avatar",
    kicker: "Data",
    description: "Image with fallback initials.",
    preview: (
      <Preview code={`<Avatar><AvatarFallback>PB</AvatarFallback></Avatar>`}>
        <Avatar>
          <AvatarFallback>PB</AvatarFallback>
        </Avatar>
      </Preview>
    ),
    a11y: "Fallback text should be initials or a name, not decorative.",
    props: [{ name: "src", type: "string", description: "On AvatarImage" }],
  },
  card: {
    title: "Card",
    kicker: "Data",
    description: "Solid panel. Surface stays the dashed portfolio chrome.",
    preview: (
      <Preview code={`<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>`}>
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Body</CardContent>
        </Card>
      </Preview>
    ),
    a11y: "A div. Put a heading in CardTitle.",
    props: [{ name: "className", type: "string", description: "Layout" }],
  },
  table: {
    title: "Table",
    kicker: "Data",
    description: "Semantic table primitives. DataTable maps columns to rows without TanStack.",
    preview: (
      <Preview code={`<Table>…</Table>`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Hatch</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Preview>
    ),
    a11y: "Use caption when the table is not introduced by a heading.",
    props: [{ name: "caption", type: "string", description: "On DataTable" }],
  },
  "data-table": {
    title: "DataTable",
    kicker: "Data",
    description:
      "Column config over Table with click-to-sort headers, an empty state and loading rows. Sorts in the browser unless manualSort is set. No virtualization.",
    preview: (
      <Preview
        code={`<DataTable
  columns={[
    { key: "name", header: "Name", cell: (row) => row.name, sortValue: (row) => row.name },
    { key: "size", header: "Size", cell: (row) => row.size, sortValue: (row) => row.size },
  ]}
  rows={rows}
  getRowId={(row) => row.name}
/>`}
      >
        <DataTable
          columns={[
            {
              key: "name",
              header: "Name",
              cell: (row: { name: string; size: number }) => row.name,
              sortValue: (row) => row.name,
            },
            {
              key: "size",
              header: "Size",
              cell: (row) => `${row.size} kB`,
              sortValue: (row) => row.size,
            },
          ]}
          rows={[
            { name: "Dialog", size: 4.1 },
            { name: "Button", size: 1.2 },
            { name: "Calendar", size: 6.8 },
          ]}
          getRowId={(row) => row.name}
        />
      </Preview>
    ),
    a11y: "A native table. Sortable headers are buttons, and the header cell carries aria-sort. Loading sets aria-busy on the table.",
    props: [
      { name: "getRowId", type: "(row) => string", description: "Stable keys" },
      {
        name: "columns[].sortValue",
        type: "(row) => string | number",
        description: "Makes the column sortable",
      },
      {
        name: "sort / defaultSort / onSortChange",
        type: "{ key, direction } | null",
        description: "Controlled or uncontrolled sort",
      },
      { name: "manualSort", type: "boolean", description: "Keep row order; sort on the server" },
      { name: "emptyText", type: "ReactNode", description: "Shown when rows is empty" },
      { name: "loading / loadingRows", type: "boolean / number", description: "Placeholder rows" },
    ],
  },
  timeline: {
    title: "Timeline",
    kicker: "Data",
    description: "Vertical list with a rail.",
    preview: (
      <Preview code={`<Timeline><TimelineItem title="Shipped" /></Timeline>`}>
        <Timeline className="w-full">
          <TimelineItem title="Shipped" meta="0.1.0">
            Tokens and primitives
          </TimelineItem>
        </Timeline>
      </Preview>
    ),
    a11y: "A list. Title is visible text.",
    props: [{ name: "title", type: "string", description: "Item heading" }],
  },
  "stat-card": {
    title: "StatCard",
    kicker: "Data",
    description: "Label, value, optional hint on Card.",
    preview: (
      <Preview code={`<StatCard label="Components" value="40+" />`}>
        <StatCard label="Components" value="40+" hint="First pass plus catalogue" />
      </Preview>
    ),
    a11y: "Description then title. Not a live region.",
    props: [{ name: "value", type: "string", description: "Primary figure" }],
  },
  "description-list": {
    title: "DescriptionList",
    kicker: "Data",
    description: "dl / dt / dd.",
    preview: (
      <Preview
        code={`<DescriptionList><DescriptionTerm>Theme</DescriptionTerm>…</DescriptionList>`}
      >
        <DescriptionList className="w-full">
          <DescriptionTerm>Theme</DescriptionTerm>
          <DescriptionDetail>portfolio</DescriptionDetail>
        </DescriptionList>
      </Preview>
    ),
    a11y: "Native description list.",
    props: [{ name: "children", type: "ReactNode", description: "Terms and details" }],
  },
  stack: {
    title: "Stack",
    kicker: "Layout",
    description: "Flex stack. Grid is the responsive sibling.",
    preview: (
      <Preview code={`<Stack gap="sm"><Badge>A</Badge></Stack>`}>
        <Stack direction="row" gap="sm">
          <Badge>A</Badge>
          <Badge variant="outline">B</Badge>
        </Stack>
      </Preview>
    ),
    a11y: "Layout only.",
    props: [
      { name: "direction", type: "row | column", defaultValue: "column", description: "Axis" },
      { name: "gap", type: "sm | md | lg", defaultValue: "md", description: "Spacing" },
    ],
  },
  grid: {
    title: "Grid",
    kicker: "Layout",
    description: "Responsive columns 1–4.",
    preview: (
      <Preview code={`<Grid columns={2}>…</Grid>`}>
        <Grid className="w-full" columns={2}>
          <StatCard label="A" value="1" />
          <StatCard label="B" value="2" />
        </Grid>
      </Preview>
    ),
    a11y: "Layout only.",
    props: [
      { name: "columns", type: "1 | 2 | 3 | 4", defaultValue: "2", description: "Column count" },
    ],
  },
  separator: {
    title: "Separator",
    kicker: "Layout",
    description: "Hairline rule. HatchDivider remains the signature section break.",
    preview: (
      <Preview code={`<Separator />`}>
        <div className="w-full">
          <Separator />
        </div>
      </Preview>
    ),
    a11y: "decorative by default.",
    props: [
      {
        name: "orientation",
        type: "horizontal | vertical",
        defaultValue: "horizontal",
        description: "Axis",
      },
    ],
  },
  "link-button": {
    title: "LinkButton",
    kicker: "Primitive",
    description: "Button styles on an anchor. Prefer this over inventing a second button.",
    preview: (
      <Preview code={`<LinkButton href="#install">Install</LinkButton>`}>
        <LinkButton href="#install">Install</LinkButton>
      </Preview>
    ),
    a11y: "Renders <a>. Do not nest buttons.",
    props: [{ name: "href", type: "string", description: "Required URL" }],
  },
  "keyboard-shortcut": {
    title: "KeyboardShortcut",
    kicker: "Primitive",
    description: "Visible kbd chips. Does not bind the shortcut — use useKeyboardShortcut.",
    preview: (
      <Preview code={`<KeyboardShortcut keys={["⌘", "K"]} />`}>
        <KeyboardShortcut keys={["⌘", "K"]} />
      </Preview>
    ),
    a11y: "kbd. Decorative relative to a labelled control.",
    props: [{ name: "keys", type: "string[]", description: "Key captions" }],
  },
  "filter-bar": {
    title: "FilterBar",
    kicker: "Pattern",
    description: "Dashed toolbar for search and filters. Compose controls inside.",
    preview: (
      <Preview code={`<FilterBar><SearchInput /></FilterBar>`}>
        <FilterBar className="w-full">
          <SearchInput className="w-48" placeholder="Filter" aria-label="Filter" />
          <Button size="sm">Apply</Button>
        </FilterBar>
      </Preview>
    ),
    a11y: "A div. Put labels on the controls inside.",
    props: [{ name: "children", type: "ReactNode", description: "Controls" }],
  },
}
