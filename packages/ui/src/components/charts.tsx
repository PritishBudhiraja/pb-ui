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
import { cn } from "../lib/cn"

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
    <div className={cn("h-64 w-full", className)} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
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
    <div className={cn("h-64 w-full", className)} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsArea data={data}>
          <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={key}
            name={series[0]?.label ?? key}
            stroke="hsl(var(--foreground))"
            fill="hsl(var(--foreground) / 0.2)"
          />
        </RechartsArea>
      </ResponsiveContainer>
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
    <div className={cn("h-64 w-full", className)} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey="name" innerRadius={50} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={String(entry.name)} fill={FILLS[index % FILLS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
