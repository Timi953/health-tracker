"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import type { MealType } from "@/types"
import { getToday } from "@/lib/date-utils"
import { MEAL_TYPE_LABELS } from "@/lib/constants"
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

export function DailyCalorieChart() {
  const { getByDate } = useNutrition()

  const data = useMemo(() => {
    const todaysMeals = getByDate(getToday())

    const caloriesByType: Record<string, number> = {}
    for (const meal of todaysMeals) {
      const label = MEAL_TYPE_LABELS[meal.mealType as MealType] ?? meal.mealType
      caloriesByType[label] = (caloriesByType[label] ?? 0) + meal.calories
    }

    return Object.entries(caloriesByType).map(([mealType, calories]) => ({
      mealType,
      calories,
    }))
  }, [getByDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Calorie Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="daily-calorie" config={chartConfig}>
          <BarChart data={data} layout="vertical" accessibilityLayer>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="mealType"
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="calories"
              fill="var(--color-calories)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
