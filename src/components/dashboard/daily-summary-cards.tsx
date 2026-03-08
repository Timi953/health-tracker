"use client"

import { useMemo } from "react"
import { IconBarbell, IconDroplet, IconFlame, IconMoon } from "@tabler/icons-react"

import type { SleepQuality } from "@/types"
import { SLEEP_QUALITY_LABELS } from "@/lib/constants"
import { getToday } from "@/lib/date-utils"
import { useNutrition } from "@/hooks/use-nutrition"
import { useWellness } from "@/hooks/use-wellness"
import { useWorkouts } from "@/hooks/use-workouts"
import { MetricCard } from "@/components/shared/metric-card"

export function DailySummaryCards() {
  const today = getToday()
  const { getByDate: getMealsByDate } = useNutrition()
  const { getByDate: getWorkoutsByDate } = useWorkouts()
  const { getByDate: getWellnessByDate } = useWellness()

  const { totalCalories, workoutCount, waterIntake, sleepHours, sleepQuality } =
    useMemo(() => {
      const meals = getMealsByDate(today)
      const calories = meals.reduce((sum, meal) => sum + meal.calories, 0)

      const workouts = getWorkoutsByDate(today)

      const wellnessEntry = getWellnessByDate(today)

      return {
        totalCalories: calories,
        workoutCount: workouts.length,
        waterIntake: wellnessEntry?.waterIntake ?? null,
        sleepHours: wellnessEntry?.sleepHours ?? null,
        sleepQuality: wellnessEntry?.sleepQuality ?? null,
      }
    }, [today, getMealsByDate, getWorkoutsByDate, getWellnessByDate])

  const sleepSubtitle =
    sleepQuality !== null
      ? SLEEP_QUALITY_LABELS[sleepQuality as SleepQuality]
      : undefined

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      <MetricCard
        title="Calories"
        value={totalCalories.toLocaleString()}
        subtitle="of 2,200 target"
        icon={IconFlame}
      />
      <MetricCard
        title="Workouts"
        value={workoutCount}
        icon={IconBarbell}
      />
      <MetricCard
        title="Water"
        value={waterIntake !== null ? `${waterIntake} glasses` : "--"}
        subtitle="of 8 glasses"
        icon={IconDroplet}
      />
      <MetricCard
        title="Sleep"
        value={sleepHours !== null ? `${sleepHours}h` : "--"}
        subtitle={sleepSubtitle}
        icon={IconMoon}
      />
    </div>
  )
}
