"use client"

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import type { ReactNode } from "react"
import { useControlledState } from "../hooks/use-controlled-state"
import { Skeleton } from "./skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

export interface DataTableColumn<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  sortValue?: (row: T) => string | number
}

export type DataTableSortDirection = "asc" | "desc"

export interface DataTableSort {
  key: string
  direction: DataTableSortDirection
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowId: (row: T) => string
  caption?: string
  emptyText?: ReactNode
  loading?: boolean
  loadingRows?: number
  sort?: DataTableSort | null
  defaultSort?: DataTableSort | null
  onSortChange?: (sort: DataTableSort | null) => void
  manualSort?: boolean
}

function nextSort(current: DataTableSort | null, key: string): DataTableSort | null {
  if (current?.key !== key) return { key, direction: "asc" }
  return current.direction === "asc" ? { key, direction: "desc" } : null
}

function sortRows<T>(
  rows: T[],
  column: DataTableColumn<T> | undefined,
  sort: DataTableSort | null,
) {
  const value = column?.sortValue
  if (!sort || !value) return rows
  const factor = sort.direction === "asc" ? 1 : -1
  return [...rows].sort((a, b) => {
    const left = value(a)
    const right = value(b)
    const order =
      typeof left === "number" && typeof right === "number"
        ? left - right
        : String(left).localeCompare(String(right), undefined, { numeric: true })
    return order * factor
  })
}

const ariaSort = { asc: "ascending", desc: "descending" } as const

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  caption,
  emptyText = "No rows to show",
  loading = false,
  loadingRows = 3,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  manualSort = false,
}: DataTableProps<T>) {
  const [sort, setSort] = useControlledState({
    value: sortProp,
    defaultValue: defaultSort,
    onChange: onSortChange,
  })
  const sortColumn = columns.find((column) => column.key === sort?.key)
  const visibleRows = manualSort ? rows : sortRows(rows, sortColumn, sort)

  return (
    <Table aria-busy={loading || undefined}>
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      <TableHeader>
        <TableRow>
          {columns.map((column) => {
            if (!column.sortValue) return <TableHead key={column.key}>{column.header}</TableHead>
            const direction = sort?.key === column.key ? sort.direction : undefined
            const Icon =
              direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ChevronsUpDown
            return (
              <TableHead key={column.key} aria-sort={direction ? ariaSort[direction] : "none"}>
                <button
                  type="button"
                  className="-mx-1 inline-flex items-center gap-1 rounded-sm px-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setSort(nextSort(sort, column.key))}
                >
                  {column.header}
                  <Icon aria-hidden className="h-3.5 w-3.5" />
                </button>
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          Array.from({ length: loadingRows }, (_, index) => (
            <TableRow key={`loading-${index}`}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : visibleRows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-8 text-center text-muted-foreground">
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          visibleRows.map((row) => (
            <TableRow key={getRowId(row)}>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.cell(row)}</TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
