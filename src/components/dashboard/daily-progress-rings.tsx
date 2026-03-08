"use client"

import { useMemo } from "react"

import { DEFAULT_DAILY_CALORIE_TARGET, DEFAULT_WATER_TARGET } from "@/lib/constants"
import { getToday } from "@/lib/date-utils"
import { useGoals } from "@/hooks/use-goals"
import { useNutrition } from "@/hooks/use-nutrition"
import { useWellness } from "@/hooks/use-wellness"
import { ProgressRing } from "@/components/shared/progress-ring"

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function DailyProgressRings() {
  const today = getToday()
  const { getDailyCalories } = useNutrition()
  const { getByDate: getWellnessByDate } = useWellness()
  const { getDailyTargetStatuses } = useGoals()

  const { caloriePercent, waterPercent, goalsPercent } = useMemo(() => {
    const calories = getDailyCalories(today)
    const calPct = (calories / DEFAULT_DAILY_CALORIE_TARGET) * 100

    const wellnessEntry = getWellnessByDate(today)
    const waterIntake = wellnessEntry?.waterIntake ?? 0
    const watPct = (waterIntake / DEFAULT_WATER_TARGET) * 100

    const statuses = getDailyTargetStatuses(today)
    const total = statuses.length
    const completed = statuses.filter((s) => s.completed).length
    const goalPct = total > 0 ? (completed / total) * 100 : 0

    return {
      caloriePercent: clampPercent(calPct),
      waterPercent: clampPercent(watPct),
      goalsPercent: clampPercent(goalPct),
    }
  }, [today, getDailyCalories, getWellnessByDate, getDailyTargetStatuses])

  return (
    <div className="flex flex-row items-center justify-center gap-8">
      <ProgressRing
        value={caloriePercent}
        label={`${caloriePercent}%`}
        sublabel="Calories"
      />
      <ProgressRing
        value={waterPercent}
        label={`${waterPercent}%`}
        sublabel="Water"
      />
      <ProgressRing
        value={goalsPercent}
        label={`${goalsPercent}%`}
        sublabel="Goals"
      />
    </div>
  )
}
