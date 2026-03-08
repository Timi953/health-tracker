"use client"

import { useMemo } from "react"
import { IconFlame, IconTarget, IconToolsKitchen2 } from "@tabler/icons-react"

import { getToday } from "@/lib/date-utils"
import { DEFAULT_DAILY_CALORIE_TARGET } from "@/lib/constants"
import { useNutrition } from "@/hooks/use-nutrition"
import { MetricCard } from "@/components/shared/metric-card"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

export function NutritionSummaryCards() {
  const { getByDate } = useNutrition()

  const todaysMeals = useMemo(() => getByDate(getToday()), [getByDate])

  const caloriesConsumed = useMemo(
    () => todaysMeals.reduce((sum, meal) => sum + meal.calories, 0),
    [todaysMeals]
  )

  const caloriesRemaining = DEFAULT_DAILY_CALORIE_TARGET - caloriesConsumed
  const isOverTarget = caloriesRemaining <= 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard
        title="Calories Consumed"
        value={caloriesConsumed}
        icon={IconFlame}
        subtitle={`of ${DEFAULT_DAILY_CALORIE_TARGET} daily target`}
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Calories Remaining</CardDescription>
            <IconTarget className="size-4 text-muted-foreground" />
          </div>
          <CardTitle
            className={`font-heading text-2xl tabular-nums ${isOverTarget ? "text-destructive" : ""}`}
          >
            {caloriesRemaining}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {isOverTarget ? "Target exceeded" : "until daily target"}
          </p>
        </CardFooter>
      </Card>
      <MetricCard
        title="Meals Logged"
        value={todaysMeals.length}
        icon={IconToolsKitchen2}
        subtitle="today"
      />
    </div>
  )
}
