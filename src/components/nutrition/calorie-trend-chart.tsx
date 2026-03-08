"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"

import { getToday, getDaysAgo, formatShortDate } from "@/lib/date-utils"
import { DEFAULT_DAILY_CALORIE_TARGET } from "@/lib/constants"
import { useNutrition } from "@/hooks/use-nutrition"
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
  calories: {
    label: "Calories",
    color: "var(--chart-1)",
  },
}

export function CalorieTrendChart() {
  const { getDailyCalories } = useNutrition()

  const data = useMemo(() => {
    const result = []
    for (let i = 6; i >= 0; i--) {
      const date = getDaysAgo(i)
      result.push({
        date: formatShortDate(date),
        calories: getDailyCalories(date),
      })
    }
    return result
  }, [getDailyCalories])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie Trends (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="calorie-trend" config={chartConfig}>
          <AreaChart data={data} accessibilityLayer>
            <defs>
              <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-calories)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-calories)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
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
              y={DEFAULT_DAILY_CALORIE_TARGET}
              stroke="var(--color-calories)"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
              label={{
                value: "Target",
                position: "insideTopRight",
                fill: "var(--color-calories)",
                fontSize: 12,
              }}
            />
            <Area
              dataKey="calories"
              type="monotone"
              stroke="var(--color-calories)"
              strokeWidth={2}
              fill="url(#calorieGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
