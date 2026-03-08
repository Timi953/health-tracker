"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import { DEFAULT_WATER_TARGET } from "@/lib/constants"
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
  waterIntake: {
    label: "Water Intake",
    color: "var(--chart-1)",
  },
}

export function WaterIntakeChart() {
  const { getByDateRange } = useWellness()

  const data = useMemo(() => {
    const entries = getByDateRange(getDaysAgo(6), getToday())
    return entries.map((entry) => ({
      date: formatShortDate(entry.date),
      waterIntake: entry.waterIntake,
    }))
  }, [getByDateRange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Intake</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="water-intake" config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ReferenceLine
              y={DEFAULT_WATER_TARGET}
              stroke="var(--chart-5)"
              strokeDasharray="3 3"
              label="Target"
            />
            <Bar
              dataKey="waterIntake"
              fill="var(--color-waterIntake)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
