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
  sleepHours: {
    label: "Sleep Hours",
    color: "var(--chart-1)",
  },
}

export function SleepTrendChart() {
  const { getByDateRange } = useWellness()

  const data = useMemo(() => {
    const entries = getByDateRange(getDaysAgo(13), getToday())
    return entries.map((entry) => ({
      date: formatShortDate(entry.date),
      sleepHours: entry.sleepHours,
    }))
  }, [getByDateRange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="sleep-trend" config={chartConfig}>
          <LineChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[0, 12]} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="sleepHours"
              type="monotone"
              stroke="var(--color-sleepHours)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
