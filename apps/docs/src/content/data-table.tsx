import { DataTable } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "data-table",
  name: "DataTable",
  when: "Sortable rows from column config.",
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
}
