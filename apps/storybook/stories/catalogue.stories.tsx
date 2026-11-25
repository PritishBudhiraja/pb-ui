import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AppShell,
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
  FilterBar,
  FormField,
  Navbar,
  NavbarBrand,
  NavbarSpacer,
  ProgressBar,
  RadioGroup,
  RadioGroupItem,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SidebarItem,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pritishbudhiraja/ui"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

function Catalogue() {
  const [combo, setCombo] = useState("one")
  return (
    <div className="grid max-w-3xl gap-8 p-4">
      <FormField label="Plan" htmlFor="plan">
        <Select>
          <SelectTrigger id="plan" className="w-56">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <Combobox
        items={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" },
        ]}
        value={combo}
        onValueChange={setCombo}
      />
      <div className="flex items-center gap-3">
        <Switch id="sw" />
        <RadioGroup defaultValue="a" className="flex gap-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="a" />
            <label htmlFor="a">A</label>
          </div>
        </RadioGroup>
        <Badge>New</Badge>
        <Spinner />
      </div>
      <Slider defaultValue={[40]} />
      <ProgressBar value={40} />
      <FilterBar>
        <SearchInput placeholder="Filter" className="w-48" />
        <Button size="sm">Apply</Button>
      </FilterBar>
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </Tabs>
      <Accordion type="single" collapsible>
        <AccordionItem value="item">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Hidden until opened.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Alert>
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>Host applications own persistence.</AlertDescription>
      </Alert>
      <Skeleton className="h-8 w-48" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Button</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AppShell
        header={
          <Navbar>
            <NavbarBrand>Hatch</NavbarBrand>
            <NavbarSpacer />
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarItem current>Overview</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
          </Sidebar>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Shell</CardTitle>
          </CardHeader>
          <CardContent>Generic application chrome.</CardContent>
        </Card>
      </AppShell>
    </div>
  )
}

const meta: Meta<typeof Catalogue> = {
  title: "Catalogue/Later components",
  component: Catalogue,
}
export default meta
type Story = StoryObj<typeof Catalogue>
export const Default: Story = {}
