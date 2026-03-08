"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { getToday, getDaysAgo, formatShortDate } from "@/lib/date-utils"
import { useNutrition } from "@/hooks/use-nutrition"
import { useWellness } from "@/hooks/use-wellness"
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type Metric = "calories" | "workouts" | "water" | "sleep"

const METRIC_OPTIONS: { value: Metric; label: string }[] = [
  { value: "calories", label: "Calories" },
  { value: "workouts", label: "Workouts" },
  { value: "water", label: "Water" },
  { value: "sleep", label: "Sleep" },
]

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
}

export function ActivityOverviewChart() {
  const [activeMetric, setActiveMetric] = useState<Metric>("calories")

  const { getByDate: getMealsByDate } = useNutrition()
  const { getByDate: getWorkoutsByDate } = useWorkouts()
  const { getByDate: getWellnessByDate } = useWellness()

  const data = useMemo(() => {
    const result = []
    for (let i = 6; i >= 0; i--) {
      const date = getDaysAgo(i)
      const meals = getMealsByDate(date)
      const workouts = getWorkoutsByDate(date)
      const wellness = getWellnessByDate(date)

      result.push({
        date: formatShortDate(date),
        calories: meals.reduce((sum, m) => sum + m.calories, 0),
        workouts: workouts.length,
        water: wellness?.waterIntake ?? 0,
        sleep: wellness?.sleepHours ?? 0,
      })
    }
    return result
  }, [getMealsByDate, getWorkoutsByDate, getWellnessByDate])

  function handleMetricChange(value: string[]) {
    if (value.length > 0) {
      setActiveMetric(value[0] as Metric)
    }
  }

  const metricLabel = METRIC_OPTIONS.find((m) => m.value === activeMetric)?.label ?? ""

  const dynamicConfig: ChartConfig = {
    [activeMetric]: {
      label: metricLabel,
      color: "var(--chart-1)",
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Weekly Activity</CardTitle>
        <ToggleGroup
          value={[activeMetric]}
          onValueChange={handleMetricChange}
          variant="outline"
          size="sm"
          spacing={1}
        >
          {METRIC_OPTIONS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <ChartContainer id="activity-overview" config={dynamicConfig}>
          <AreaChart data={data} accessibilityLayer>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={`var(--color-${activeMetric})`}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={`var(--color-${activeMetric})`}
                  stopOpacity={0.05}
                />
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
            <Area
              dataKey={activeMetric}
              type="monotone"
              stroke={`var(--color-${activeMetric})`}
              strokeWidth={2}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
