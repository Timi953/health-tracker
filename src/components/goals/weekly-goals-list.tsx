"use client"

import { useMemo } from "react"
import { IconTarget } from "@tabler/icons-react"

import { getWeekStartDate } from "@/lib/date-utils"
import { useGoals } from "@/hooks/use-goals"
import { EmptyState } from "@/components/shared/empty-state"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function WeeklyGoalsList() {
  const { getWeeklyGoalProgress } = useGoals()

  const progressList = useMemo(
    () => getWeeklyGoalProgress(getWeekStartDate()),
    [getWeeklyGoalProgress]
  )

  if (progressList.length === 0) {
    return (
      <EmptyState
        title="No weekly goals yet"
        description="Create a weekly goal to track your progress over the week."
        icon={IconTarget}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {progressList.map((progress) => (
        <WeeklyGoalCard key={progress.goalId} progress={progress} />
      ))}
    </div>
  )
}

interface WeeklyGoalCardProps {
  progress: {
    goalId: string
    goal: { name: string; unit: string }
    currentValue: number
    targetValue: number
    progressPercent: number
    daysCompleted: number
  }
}

function WeeklyGoalCard({ progress }: WeeklyGoalCardProps) {
  const { goal, currentValue, targetValue, progressPercent, daysCompleted } =
    progress
  const clampedPercent = Math.min(Math.round(progressPercent), 100)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="font-heading font-semibold">
          {goal.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Progress value={clampedPercent} />
        <div className="flex items-center justify-between">
          <span className="text-sm tabular-nums text-muted-foreground">
            {currentValue} / {targetValue} {goal.unit}
          </span>
          <span className="text-sm font-semibold tabular-nums">
            {clampedPercent}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {daysCompleted} {daysCompleted === 1 ? "day" : "days"} completed
        </p>
      </CardContent>
    </Card>
  )
}
