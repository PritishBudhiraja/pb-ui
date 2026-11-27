// Renders many components together to check they compose and pass axe as a set.
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { LoadingButton } from "./actions/loading-button"
import { AIExecutionStatus } from "./content/ai-execution-status"
import { CodeBlock } from "./content/code-block"
import { MarkdownRenderer } from "./content/markdown-renderer"
import { MilestoneStepper, WorkflowStepper } from "./content/stepper"
import { StreamingText } from "./content/streaming-text"
import { Avatar, AvatarFallback, AvatarImage } from "./data/avatar"
import { Badge } from "./data/badge"
import { DataTable } from "./data/data-table"
import { DescriptionDetail, DescriptionList, DescriptionTerm } from "./data/description-list"
import { Heading } from "./data/heading"
import { ScrollArea } from "./data/scroll-area"
import { Separator } from "./data/separator"
import { Grid, Stack } from "./data/stack"
import { StatCard } from "./data/stat-card"
import { Text } from "./data/text"
import { Timeline, TimelineItem } from "./data/timeline"
import { Checkbox } from "./forms/checkbox"
import { FilterBar } from "./forms/filter-bar"
import { Input } from "./forms/input"
import { Label } from "./forms/label"
import { RadioGroup, RadioGroupItem } from "./forms/radio-group"
import { SearchInput } from "./forms/search-input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./forms/select"
import { Slider } from "./forms/slider"
import { Switch } from "./forms/switch"
import { Textarea } from "./forms/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./navigation/accordion"
import { AppShell } from "./navigation/app-shell"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./navigation/breadcrumb"
import { InspectorPanel } from "./navigation/inspector-panel"
import { KeyboardShortcut } from "./navigation/keyboard-shortcut"
import { Navbar, NavbarBrand, NavbarSpacer } from "./navigation/navbar"
import {
  Pagination,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "./navigation/pagination"
import { CollapsibleSidebar, Sidebar, SidebarItem, SidebarSection } from "./navigation/sidebar"
import { SplitWorkspace } from "./navigation/split-workspace"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./navigation/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./overlays/alert-dialog"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./overlays/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./overlays/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./overlays/dropdown-menu"
import { EmptyState } from "./overlays/empty-state"
import { ErrorState } from "./overlays/error-state"
import { Popover, PopoverContent, PopoverTrigger } from "./overlays/popover"
import { ProgressBar, ProgressRing } from "./overlays/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./overlays/sheet"
import { Skeleton } from "./overlays/skeleton"
import { Spinner } from "./overlays/spinner"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./overlays/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./overlays/tooltip"
import { ActivityTimeline } from "./presentation/activity-timeline"
import { CountdownDisplay } from "./presentation/countdown-display"
import { TimeAllocationBar } from "./presentation/time-allocation-bar"
import { WeeklyActivityGrid } from "./presentation/weekly-activity-grid"
import { CalendarHeatmap } from "./signature/calendar-heatmap"
import { EditorialAnnotation } from "./signature/editorial-annotation"
import { EditorialHeading } from "./signature/editorial-heading"
import { FramedContainer } from "./signature/framed-container"
import { HatchDivider } from "./signature/hatch-divider"
import { Surface } from "./signature/surface"

describe("catalogue primitives", () => {
  it("renders layout, data, and feedback pieces", async () => {
    render(
      <FramedContainer wide>
        <AppShell
          header={
            <Navbar>
              <NavbarBrand>Hatch</NavbarBrand>
              <NavbarSpacer />
            </Navbar>
          }
          sidebar={
            <Sidebar aria-label="Main">
              <SidebarSection title="Nav">
                <SidebarItem current>Home</SidebarItem>
              </SidebarSection>
            </Sidebar>
          }
        >
          <Stack>
            <Heading>Title</Heading>
            <Text tone="muted">Body</Text>
            <EditorialHeading>Serif</EditorialHeading>
            <Badge>New</Badge>
            <KeyboardShortcut keys={["⌘", "K"]} />
            <FilterBar>filters</FilterBar>
            <Grid columns={2}>
              <StatCard label="Tasks" value="12" hint="this week" />
              <Surface dashed={false}>solid</Surface>
            </Grid>
            <SearchInput placeholder="Search" />
            <Input aria-label="Name" />
            <Textarea aria-label="Notes" />
            <Spinner />
            <Skeleton />
            <EmptyState
              title="Nothing here"
              description="Add one"
              action={<button type="button">Add</button>}
            />
            <ErrorState
              title="Failed"
              description="Try again"
              action={<button type="button">Retry</button>}
            />
            <ProgressBar />
            <ProgressBar value={40} label="Upload" />
            <ProgressRing />
            <ProgressRing value={40} label="Forty" />
            <FramedContainer>narrow</FramedContainer>
            <EmptyState title="Bare" />
            <ErrorState title="Bare error" />
            <StatCard label="Only" value="1" />
            <Surface>dashed</Surface>
            <Sidebar aria-label="Filters">
              <SidebarItem>Idle</SidebarItem>
              <SidebarSection>
                <SidebarItem>Child</SidebarItem>
              </SidebarSection>
            </Sidebar>
            <Timeline>
              <TimelineItem title="Solo" />
            </Timeline>
            <DataTable
              getRowId={(row) => row.id}
              columns={[{ key: "name", header: "Name", cell: (row) => row.name }]}
              rows={[{ id: "2", name: "Bob" }]}
            />
            <LoadingButton>Idle</LoadingButton>
            <Badge variant="secondary">S</Badge>
            <Badge variant="outline">O</Badge>
            <Badge variant="destructive">X</Badge>
            <Text>Default</Text>
            <Text tone="editorial">Ed</Text>
            <Heading as="h1" size="sm">
              Small
            </Heading>
            <Heading size="lg">Large</Heading>
            <Heading size="xl">XL</Heading>
            <EditorialHeading as="p">Para</EditorialHeading>
            <Stack direction="row" gap="sm">
              row
            </Stack>
            <Grid columns={1} gap="lg">
              one
            </Grid>
            <Grid columns={3}>three</Grid>
            <Grid columns={4}>four</Grid>
            <CalendarHeatmap days={[]} />
            <Pagination>
              <PaginationPrevious />
              <PaginationButton current>1</PaginationButton>
              <PaginationNext />
            </Pagination>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span>Slot</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Here</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <DescriptionList>
              <DescriptionTerm>Kind</DescriptionTerm>
              <DescriptionDetail>Library</DescriptionDetail>
            </DescriptionList>
            <DataTable
              caption="People"
              getRowId={(row) => row.id}
              columns={[{ key: "name", header: "Name", cell: (row) => row.name }]}
              rows={[{ id: "1", name: "Ada" }]}
            />
            <Timeline>
              <TimelineItem title="Shipped" meta="Nov">
                Docs
              </TimelineItem>
            </Timeline>
            <CalendarHeatmap
              from="2026-01-01"
              to="2026-01-03"
              days={[
                { date: "2026-01-01", count: 1, level: 1 },
                { date: "2026-01-03", count: 2, level: 2 },
              ]}
            />
            <div className="relative">
              <EditorialAnnotation side="left">note</EditorialAnnotation>
              <EditorialAnnotation>other</EditorialAnnotation>
            </div>
            <HatchDivider />
          </Stack>
        </AppShell>
      </FramedContainer>,
    )

    expect(screen.getByText("Hatch")).toBeInTheDocument()
    expect(screen.getByRole("status")).toBeInTheDocument()
    expect(screen.getAllByRole("alert").some((node) => node.textContent?.includes("Failed"))).toBe(
      true,
    )
    expect(screen.getByRole("img", { name: /Forty/ })).toBeInTheDocument()
    await expectNoAxeViolations()
    expect(screen.getByText("Ada")).toBeInTheDocument()
    expect(screen.getByText("3 total, 2026-01-01 to 2026-01-03")).toBeInTheDocument()
  })
})

describe("overlay primitives", () => {
  it("renders dialogs, menus, and form controls", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Accordion type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>Section</AccordionTrigger>
            <AccordionContent>Body</AccordionContent>
          </AccordionItem>
        </Accordion>
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sure?</AlertDialogTitle>
              <AlertDialogDescription>Gone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Avatar>
          <AvatarImage alt="" src="https://example.com/x.png" />
          <AvatarFallback>PB</AvatarFallback>
        </Avatar>
        <Label htmlFor="on">On</Label>
        <Checkbox id="on" />
        <Switch aria-label="Toggle" />
        <RadioGroup defaultValue="a">
          <RadioGroupItem value="a" aria-label="A" />
        </RadioGroup>
        <Slider defaultValue={[40]} aria-label="Volume" />
        <Slider value={[10, 90]} thumbLabels={["Minimum", "Maximum"]} />
        <Slider aria-labelledby="volume-label" />
        <span id="volume-label">Gain</span>
        <ScrollArea className="h-10">
          <p>scroll</p>
        </ScrollArea>
        <Separator />
        <Separator orientation="vertical" className="h-4" />
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Pane</TabsContent>
        </Tabs>
        <Dialog>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Desc</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent aria-label="Tip">Tip</PopoverContent>
        </Popover>
        <Sheet>
          <SheetTrigger>Open sheet</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Drawer</SheetTitle>
              <SheetDescription>Side</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Group</DropdownMenuLabel>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuCheckboxItem checked>Check</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <ContextMenu>
          <ContextMenuTrigger>Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Ctx</ContextMenuLabel>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuCheckboxItem checked>On</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
          </ContextMenuContent>
        </ContextMenu>
        <Select defaultValue="a">
          <SelectTrigger aria-label="Pick">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Opts</SelectLabel>
              <SelectItem value="a">Alpha</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="b">
          <SelectTrigger aria-label="Aligned">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="b">Beta</SelectItem>
          </SelectContent>
        </Select>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Hint</TooltipContent>
        </Tooltip>
        <ToastProvider>
          <Toast variant="destructive">
            <ToastTitle>Hi</ToastTitle>
            <ToastDescription>There</ToastDescription>
            <ToastAction altText="Undo">Undo</ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </TooltipProvider>,
    )

    expect(screen.getByRole("slider", { name: "Minimum" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Maximum" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Gain" })).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.click(screen.getByRole("button", { name: "Section" }))
    expect(screen.getByText("Body")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Delete" }))
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    expect(screen.getByRole("dialog", { name: "Title" })).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open popover" }))
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open sheet" }))
    expect(screen.getByText("Drawer")).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Menu" }))
    expect(screen.getByText("Item")).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.pointer({ keys: "[MouseRight>]", target: screen.getByText("Right click") })
    expect(screen.getByRole("menuitem", { name: "Paste" })).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})

describe("expansion components", () => {
  it("renders markdown, code, stream, and countdown", () => {
    render(
      <>
        <MarkdownRenderer
          markdown={
            "# Title\n\n## Sub\n\n### Small\n\nA [link](/x) and `code`.\n\n```js\nblock\n```\n\n- item\n\n1. one\n\n~~old~~\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n![no](http://example.com/x.png)"
          }
        />
        <CodeBlock code="const x = 1" />
        <StreamingText text="Hello" streaming />
        <StreamingText text="Done" />
        <CountdownDisplay remainingSeconds={-3} />
        <CountdownDisplay remainingSeconds={3661} />
      </>,
    )
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "link" })).toHaveAttribute("href", "/x")
    expect(screen.getByRole("timer", { name: /00:00:00/ })).toBeInTheDocument()
    expect(screen.getByRole("timer", { name: /01:01:01/ })).toBeInTheDocument()
  })

  it("renders status, allocation, activity, and steppers", () => {
    render(
      <>
        <AIExecutionStatus
          steps={[
            { id: "1", label: "Plan", status: "done", detail: "ok" },
            { id: "2", label: "Run", status: "running" },
            { id: "3", label: "Fail", status: "error" },
            { id: "4", label: "Wait", status: "pending" },
          ]}
        />
        <MilestoneStepper
          current={1}
          steps={[
            { id: "m1", label: "One", description: "start" },
            { id: "m2", label: "Two" },
          ]}
        />
        <WorkflowStepper
          current={1}
          steps={[
            { id: "w1", label: "Draft", status: "error" },
            { id: "w2", label: "Ship" },
          ]}
        />
        <WorkflowStepper
          current={1}
          steps={[
            { id: "d1", label: "Done" },
            { id: "d2", label: "Now" },
            { id: "d3", label: "Later" },
          ]}
        />
        <TimeAllocationBar
          segments={[
            { label: "Deep", value: 3 },
            { label: "Shallow", value: 1 },
          ]}
        />
        <TimeAllocationBar segments={[{ label: "None", value: 0 }]} />
        <WeeklyActivityGrid
          cells={[
            { day: 1, hour: 9, value: 0 },
            { day: 1, hour: 10, value: 1 },
            { day: 1, hour: 11, value: 3 },
            { day: 1, hour: 12, value: 5 },
            { day: 1, hour: 13, value: 8 },
          ]}
          startHour={9}
          endHour={14}
        />
        <ActivityTimeline
          items={[{ id: "t", title: "Shipped", meta: "today", description: "ok" }]}
        />
      </>,
    )
    expect(screen.getByText("Plan")).toBeInTheDocument()
    expect(screen.getByText("Shipped")).toBeInTheDocument()
  })

  it("renders layout chrome", () => {
    render(
      <AppShell
        sidebar={
          <CollapsibleSidebar collapsed>
            <SidebarItem>Home</SidebarItem>
          </CollapsibleSidebar>
        }
        inspector={<InspectorPanel title="Inspector">Meta</InspectorPanel>}
      >
        <SplitWorkspace nav={<Sidebar>Nav</Sidebar>} main={<p>Main</p>} inspector={<p>Side</p>} />
      </AppShell>,
    )
    expect(screen.getByText("Inspector")).toBeInTheDocument()
    expect(screen.getByText("Main")).toBeInTheDocument()
    render(<SplitWorkspace main={<p>Only</p>} />)
    expect(screen.getByText("Only")).toBeInTheDocument()
  })
})
