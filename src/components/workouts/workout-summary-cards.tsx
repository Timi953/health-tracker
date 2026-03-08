"use client"

import { useMemo } from "react"
import { IconBarbell, IconWeight, IconRun } from "@tabler/icons-react"

import { getWeekStartDate, getWeekEndDate } from "@/lib/date-utils"
import { useWorkouts } from "@/hooks/use-workouts"
import { MetricCard } from "@/components/shared/metric-card"

export function WorkoutSummaryCards() {
  const { getByDateRange } = useWorkouts()

  const weekStart = useMemo(() => getWeekStartDate(), [])
  const weekEnd = useMemo(() => getWeekEndDate(), [])

  const weekWorkouts = useMemo(
    () => getByDateRange(weekStart, weekEnd),
    [getByDateRange, weekStart, weekEnd]
  )

  const totalVolume = useMemo(() => {
    let volume = 0
    for (const workout of weekWorkouts) {
      for (const exercise of workout.exercises) {
        if (exercise.sets) {
          for (const set of exercise.sets) {
            volume += set.weight * set.reps
          }
        }
      }
    }
    return volume
  }, [weekWorkouts])

  const cardioTime = useMemo(() => {
    let minutes = 0
    for (const workout of weekWorkouts) {
      for (const exercise of workout.exercises) {
        if (exercise.cardioMetrics) {
          minutes += exercise.cardioMetrics.duration
        }
      }
    }
    return minutes
  }, [weekWorkouts])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard
        title="Workouts"
        value={weekWorkouts.length}
        icon={IconBarbell}
        subtitle="this week"
      />
      <MetricCard
        title="Total Volume"
        value={`${totalVolume.toLocaleString()} lbs`}
        icon={IconWeight}
        subtitle="this week"
      />
      <MetricCard
        title="Cardio Time"
        value={`${cardioTime} min`}
        icon={IconRun}
        subtitle="this week"
      />
    </div>
  )
}
