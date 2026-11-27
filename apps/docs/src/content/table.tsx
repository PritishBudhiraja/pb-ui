import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "table",
  name: "Table",
  when: "Simple HTML table styling.",
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
}
