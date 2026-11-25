import type { ReactNode } from "react"
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
}

export function DataTable<T>({
  columns,
  rows,
  caption,
  getRowId,
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  caption?: string
  getRowId: (row: T) => string
}) {
  return (
    <Table>
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={getRowId(row)}>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.cell(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
