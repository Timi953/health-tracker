"use client"

import { IconCheck } from "@tabler/icons-react"

import type { DailyTargetStatus } from "@/types"
import { StreakCounter } from "@/components/shared/streak-counter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface GoalProgressCardProps {
  status: DailyTargetStatus
}

export function GoalProgressCard({ status }: GoalProgressCardProps) {
  const { goal, currentValue, completed, streak } = status
  const progressPercent = Math.min(
    Math.round((currentValue / goal.targetValue) * 100),
    100
  )

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-heading font-semibold">{goal.name}</span>
          {completed && (
            <IconCheck className="size-5 text-primary" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          {goal.description ?? `${goal.targetValue} ${goal.unit}`}
        </p>
        <Progress value={progressPercent} />
        <div className="flex items-center justify-between">
          <span className="text-sm tabular-nums text-muted-foreground">
            {currentValue} / {goal.targetValue} {goal.unit}
          </span>
          <StreakCounter count={streak} />
        </div>
      </CardContent>
    </Card>
  )
}
