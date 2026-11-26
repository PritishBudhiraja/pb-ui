"use client"

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { useControlledState } from "../hooks/use-controlled-state"
import { cn } from "../lib/cn"
import { IconButton } from "./icon-button"

export interface SortableItem {
  id: string
  label: string
}

export function handleSortEnd<T extends { id: string }>(
  list: T[],
  activeId: string | number,
  overId?: string | number | null,
) {
  if (overId === undefined || overId === null || activeId === overId) return list
  const from = list.findIndex((item) => item.id === activeId)
  const to = list.findIndex((item) => item.id === overId)
  if (from < 0 || to < 0) return list
  return arrayMove(list, from, to)
}

export function moveItems<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list
  return arrayMove(list, from, to)
}

export interface SortableListProps {
  items?: SortableItem[]
  defaultItems?: SortableItem[]
  onReorder?: (items: SortableItem[]) => void
  className?: string
  label?: string
}

function Row({
  item,
  index,
  total,
  onMove,
}: {
  item: SortableItem
  index: number
  total: number
  onMove: (from: number, to: number) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-2 py-1.5",
        isDragging && "opacity-70",
      )}
    >
      <IconButton
        variant="ghost"
        className="h-7 w-7 text-muted-foreground"
        label={`Drag ${item.label}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical />
      </IconButton>
      <span className="flex-1 text-sm">{item.label}</span>
      <IconButton
        variant="ghost"
        className="h-7 w-7"
        label={`Move ${item.label} up`}
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
      >
        <ChevronUp />
      </IconButton>
      <IconButton
        variant="ghost"
        className="h-7 w-7"
        label={`Move ${item.label} down`}
        disabled={index === total - 1}
        onClick={() => onMove(index, index + 1)}
      >
        <ChevronDown />
      </IconButton>
    </li>
  )
}

export function SortableList({
  items,
  defaultItems = [],
  onReorder,
  className,
  label = "Sortable list",
}: SortableListProps) {
  const [list, setList] = useControlledState({
    value: items,
    defaultValue: defaultItems,
    onChange: onReorder,
  })
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function move(from: number, to: number) {
    setList(moveItems(list, from, to))
  }

  function onDragEnd(event: DragEndEvent) {
    setList(handleSortEnd(list, event.active.id, event.over?.id))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={list.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <ul aria-label={label} className={cn("grid gap-2", className)}>
          {list.map((item, index) => (
            <Row key={item.id} item={item} index={index} total={list.length} onMove={move} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
