"use client"

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  AreaChart as RechartsArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "../../lib/cn"

export interface ChartDatum {
  name: string
  [key: string]: string | number
}

export interface ChartSeries {
  key: string
  label?: string
}

const FILLS = [
  "var(--foreground)",
  "color-mix(in srgb, var(--foreground) 55%, transparent)",
  "color-mix(in srgb, var(--foreground) 30%, transparent)",
]

function ChartDataTable({
  label,
  data,
  columns,
}: {
  label: string
  data: ChartDatum[]
  columns: ChartSeries[]
}) {
  return (
    <table className="sr-only">
      <caption>{label}</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          {columns.map((column) => (
            <th key={column.key} scope="col">
              {column.label ?? column.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <th scope="row">{row.name}</th>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function StackedBarChart({
  data,
  series,
  className,
  label = "Stacked bar chart",
}: {
  data: ChartDatum[]
  series: ChartSeries[]
  className?: string
  label?: string
}) {
  return (
    <div className={cn("h-64 w-full", className)}>
      <div className="h-full w-full" role="img" aria-label={label}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <Tooltip />
            <Legend />
            {series.map((item, index) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.label ?? item.key}
                stackId="a"
                fill={FILLS[index % FILLS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable label={label} data={data} columns={series} />
    </div>
  )
}

export function AreaChart({
  data,
  series,
  className,
  label = "Area chart",
}: {
  data: ChartDatum[]
  series: ChartSeries[]
  className?: string
  label?: string
}) {
  const key = series[0]?.key ?? "value"
  return (
    <div className={cn("h-64 w-full", className)}>
      <div className="h-full w-full" role="img" aria-label={label}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsArea data={data}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={key}
              name={series[0]?.label ?? key}
              stroke="var(--foreground)"
              fill="color-mix(in oklab, var(--foreground) 20%, transparent)"
            />
          </RechartsArea>
        </ResponsiveContainer>
      </div>
      <ChartDataTable label={label} data={data} columns={[{ key, label: series[0]?.label }]} />
    </div>
  )
}

export function DonutChart({
  data,
  dataKey = "value",
  className,
  label = "Donut chart",
}: {
  data: ChartDatum[]
  dataKey?: string
  className?: string
  label?: string
}) {
  return (
    <div className={cn("h-64 w-full", className)}>
      <div className="h-full w-full" role="img" aria-label={label}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey={dataKey} nameKey="name" innerRadius={50} outerRadius={80}>
              {data.map((_, index) => (
                <Cell key={index} fill={FILLS[index % FILLS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable label={label} data={data} columns={[{ key: dataKey }]} />
    </div>
  )
}
