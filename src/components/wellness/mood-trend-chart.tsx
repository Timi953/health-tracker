"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  mood: {
    label: "Mood",
    color: "var(--chart-1)",
  },
}

export function MoodTrendChart() {
  const { getByDateRange } = useWellness()

  const data = useMemo(() => {
    const entries = getByDateRange(getDaysAgo(13), getToday())
    return entries.map((entry) => ({
      date: formatShortDate(entry.date),
      mood: entry.mood,
    }))
  }, [getByDateRange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="mood-trend" config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[1, 5]} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="mood"
              fill="var(--color-mood)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
