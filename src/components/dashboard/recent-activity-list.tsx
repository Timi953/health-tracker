"use client"

import { useMemo } from "react"
import { IconApple, IconBarbell, IconHeart } from "@tabler/icons-react"

import type { Meal, WellnessEntry, Workout } from "@/types"
import { useNutrition } from "@/hooks/use-nutrition"
import { useWellness } from "@/hooks/use-wellness"
import { useWorkouts } from "@/hooks/use-workouts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EmptyState } from "@/components/shared/empty-state"

interface ActivityEntry {
  id: string
  domain: "workout" | "nutrition" | "wellness"
  description: string
  createdAt: string
}

function formatRelativeTime(createdAt: string): string {
  const now = Date.now()
  const then = new Date(createdAt).getTime()
  const diffMs = now - then

  const diffMinutes = Math.floor(diffMs / 60_000)
  if (diffMinutes < 1) return "Just now"
  if (diffMinutes < 60) return `${diffMinutes}m ago`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "Yesterday"

  return `${diffDays}d ago`
}

function workoutToActivity(workout: Workout): ActivityEntry {
  const exerciseCount = workout.exercises.length
  const suffix = exerciseCount === 1 ? "exercise" : "exercises"
  return {
    id: workout.id,
    domain: "workout",
    description: `Logged ${workout.name} \u2014 ${exerciseCount} ${suffix}`,
    createdAt: workout.createdAt,
  }
}

function mealToActivity(meal: Meal): ActivityEntry {
  return {
    id: meal.id,
    domain: "nutrition",
    description: `${meal.name} \u2014 ${meal.calories} cal`,
    createdAt: meal.createdAt,
  }
}

function wellnessToActivity(entry: WellnessEntry): ActivityEntry {
  return {
    id: entry.id,
    domain: "wellness",
    description: `Wellness check-in \u2014 ${entry.sleepHours}h sleep`,
    createdAt: entry.createdAt,
  }
}

const DOMAIN_ICONS = {
  workout: IconBarbell,
  nutrition: IconApple,
  wellness: IconHeart,
} as const

export function RecentActivityList() {
  const { workouts } = useWorkouts()
  const { meals } = useNutrition()
  const { entries: wellnessEntries } = useWellness()

  const activities = useMemo(() => {
    const all: ActivityEntry[] = [
      ...workouts.map(workoutToActivity),
      ...meals.map(mealToActivity),
      ...wellnessEntries.map(wellnessToActivity),
    ]

    all.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return all.slice(0, 8)
  }, [workouts, meals, wellnessEntries])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <EmptyState
            title="No activity yet"
            description="Start logging workouts, meals, or wellness check-ins to see your recent activity here."
          />
        ) : (
          <ScrollArea className="max-h-[400px]">
            <ul className="flex flex-col gap-3">
              {activities.map((activity) => {
                const Icon = DOMAIN_ICONS[activity.domain]
                return (
                  <li
                    key={activity.id}
                    className="flex items-center gap-3 rounded-md border p-3"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium">
                        {activity.description}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(activity.createdAt)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
