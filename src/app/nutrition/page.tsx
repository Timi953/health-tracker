"use client"

import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { NutritionSummaryCards } from "@/components/nutrition/nutrition-summary-cards"
import { DailyCalorieChart } from "@/components/nutrition/daily-calorie-chart"
import { CalorieTrendChart } from "@/components/nutrition/calorie-trend-chart"
import { MealHistoryList } from "@/components/nutrition/meal-history-list"
import { MealLogDialog } from "@/components/nutrition/meal-log-dialog"

export default function NutritionPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div />
        <Button onClick={() => setDialogOpen(true)}>
          <IconPlus className="size-4" />
          Log Meal
        </Button>
      </div>
      <NutritionSummaryCards />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DailyCalorieChart />
        <CalorieTrendChart />
      </div>
      <MealHistoryList />
      <MealLogDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
