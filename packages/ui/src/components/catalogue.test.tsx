import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { AppShell } from "./app-shell"
import { Badge } from "./badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"
import { CalendarHeatmap } from "./calendar-heatmap"
import { DataTable } from "./data-table"
import { DescriptionDetail, DescriptionList, DescriptionTerm } from "./description-list"
import { EditorialAnnotation } from "./editorial-annotation"
import { EditorialHeading } from "./editorial-heading"
import { EmptyState } from "./empty-state"
import { ErrorState } from "./error-state"
import { FilterBar } from "./filter-bar"
import { FramedContainer } from "./framed-container"
import { HatchDivider } from "./hatch-divider"
import { Heading } from "./heading"
import { Input } from "./input"
import { KeyboardShortcut } from "./keyboard-shortcut"
import { LoadingButton } from "./loading-button"
import { Navbar, NavbarBrand, NavbarSpacer } from "./navbar"
import { Pagination, PaginationButton, PaginationNext, PaginationPrevious } from "./pagination"
import { ProgressBar, ProgressRing } from "./progress"
import { SearchInput } from "./search-input"
import { Sidebar, SidebarItem, SidebarSection } from "./sidebar"
import { Skeleton } from "./skeleton"
import { Spinner } from "./spinner"
import { Grid, Stack } from "./stack"
import { StatCard } from "./stat-card"
import { Surface } from "./surface"
import { Text } from "./text"
import { Textarea } from "./textarea"
import { Timeline, TimelineItem } from "./timeline"

describe("catalogue primitives", () => {
  it("renders layout, data, and feedback pieces", () => {
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
            <Sidebar>
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
            <ErrorState title="Failed" description="Try again" action={<button type="button">Retry</button>} />
            <ProgressBar />
            <ProgressBar value={40} />
            <ProgressRing />
            <ProgressRing value={40} label="Forty" />
            <FramedContainer>narrow</FramedContainer>
            <EmptyState title="Bare" />
            <ErrorState title="Bare error" />
            <StatCard label="Only" value="1" />
            <Surface>dashed</Surface>
            <Sidebar>
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
    expect(screen.getByText("Ada")).toBeInTheDocument()
    expect(screen.getByText("3 total, 2026-01-01 to 2026-01-03")).toBeInTheDocument()
  })
})
