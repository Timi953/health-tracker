"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  getWeekStartDate,
  getWeekEndDate,
  getDateRange,
  formatShortDate,
} from "@/lib/date-utils"
import { useWorkouts } from "@/hooks/use-workouts"
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
  strength: {
    label: "Strength",
    color: "var(--chart-1)",
  },
  cardio: {
    label: "Cardio",
    color: "var(--chart-3)",
  },
}

export function WorkoutTypeChart() {
  const { getByDateRange } = useWorkouts()

  const weekStart = useMemo(() => getWeekStartDate(), [])
  const weekEnd = useMemo(() => getWeekEndDate(), [])

  const data = useMemo(() => {
    const workouts = getByDateRange(weekStart, weekEnd)
    const dates = getDateRange(weekStart, weekEnd)

    return dates.map((date) => {
      const dayWorkouts = workouts.filter((w) => w.date === date)

      let strength = 0
      let cardio = 0

      for (const workout of dayWorkouts) {
        const hasStrength = workout.exercises.some((e) => e.type === "strength")
        const hasCardio = workout.exercises.some((e) => e.type === "cardio")

        if (hasStrength) strength++
        if (hasCardio) cardio++
      }

      return {
        date: formatShortDate(date),
        strength,
        cardio,
      }
    })
  }, [getByDateRange, weekStart, weekEnd])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Types This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer id="workout-type" config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="strength"
              fill="var(--color-strength)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="cardio"
              fill="var(--color-cardio)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
