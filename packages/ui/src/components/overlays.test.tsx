import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
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
} from "./alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Checkbox } from "./checkbox"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { ScrollArea } from "./scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Separator } from "./separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

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
        <Slider defaultValue={[40]} />
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
          <PopoverContent>Tip</PopoverContent>
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

    await user.click(screen.getByRole("button", { name: "Section" }))
    expect(screen.getByText("Body")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Delete" }))
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    expect(screen.getByRole("dialog", { name: "Title" })).toBeInTheDocument()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open popover" }))
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Open sheet" }))
    expect(screen.getByText("Drawer")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Menu" }))
    expect(screen.getByText("Item")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    await user.pointer({ keys: "[MouseRight>]", target: screen.getByText("Right click") })
    expect(screen.getByRole("menuitem", { name: "Paste" })).toBeInTheDocument()
  })

  it("opens remaining sheet sides", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Sheet>
          <SheetTrigger>Top</SheetTrigger>
          <SheetContent side="top">
            <SheetTitle>Top sheet</SheetTitle>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>Bottom</SheetTrigger>
          <SheetContent side="bottom">
            <SheetTitle>Bottom sheet</SheetTitle>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>Right</SheetTrigger>
          <SheetContent>
            <SheetTitle>Right sheet</SheetTitle>
          </SheetContent>
        </Sheet>
      </>,
    )
    await user.click(screen.getByRole("button", { name: "Top" }))
    expect(screen.getByText("Top sheet")).toBeInTheDocument()
  })
})
