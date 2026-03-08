"use client"

import { useMemo } from "react"
import { IconTarget } from "@tabler/icons-react"

import { getToday } from "@/lib/date-utils"
import { useGoals } from "@/hooks/use-goals"
import { EmptyState } from "@/components/shared/empty-state"
import { GoalProgressCard } from "@/components/goals/goal-progress-card"

export function DailyTargetsList() {
  const { getDailyTargetStatuses } = useGoals()

  const statuses = useMemo(
    () => getDailyTargetStatuses(getToday()),
    [getDailyTargetStatuses]
  )

  if (statuses.length === 0) {
    return (
      <EmptyState
        title="No daily goals yet"
        description="Create a daily goal to start tracking your progress."
        icon={IconTarget}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statuses.map((status) => (
        <GoalProgressCard key={status.goalId} status={status} />
      ))}
    </div>
  )
}
