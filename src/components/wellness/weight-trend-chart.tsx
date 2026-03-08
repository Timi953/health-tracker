"use client"

import { useMemo } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { getToday, getDaysAgo, formatShortDate } from "@/lib/date-utils"
import { useWellness } from "@/hooks/use-wellness"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig: ChartConfig = {
  weight: {
    label: "Weight",
    color: "var(--chart-1)",
  },
}

export function WeightTrendChart() {
  const { getByDateRange } = useWellness()

  const data = useMemo(() => {
    const entries = getByDateRange(getDaysAgo(29), getToday())
    return entries
      .filter((entry) => entry.weight !== undefined)
      .map((entry) => ({
        date: formatShortDate(entry.date),
        weight: entry.weight,
      }))
  }, [getByDateRange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="weight-trend" config={chartConfig}>
          <LineChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} domain={["auto", "auto"]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="weight"
              type="monotone"
              stroke="var(--color-weight)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
