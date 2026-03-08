"use client"

import { useMemo } from "react"
import { IconTrash, IconToolsKitchen2 } from "@tabler/icons-react"

import { getToday } from "@/lib/date-utils"
import { MEAL_TYPE_LABELS } from "@/lib/constants"
import { useNutrition } from "@/hooks/use-nutrition"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MealHistoryList() {
  const { getByDate, deleteMeal } = useNutrition()

  const todaysMeals = useMemo(() => getByDate(getToday()), [getByDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Meals</CardTitle>
      </CardHeader>
      <CardContent>
        {todaysMeals.length === 0 ? (
          <EmptyState
            title="No meals logged today"
            description="Start tracking your nutrition by logging your first meal."
            icon={IconToolsKitchen2}
          />
        ) : (
          <div className="flex flex-col gap-2">
            {todaysMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <Badge variant="secondary">
                  {MEAL_TYPE_LABELS[meal.mealType]}
                </Badge>
                <span className="flex-1 text-sm font-medium">{meal.name}</span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {meal.calories} cal
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => deleteMeal(meal.id)}
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
