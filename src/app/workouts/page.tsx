"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { WorkoutSummaryCards } from "@/components/workouts/workout-summary-cards"
import { WorkoutTypeChart } from "@/components/workouts/workout-type-chart"
import { WorkoutHistoryTable } from "@/components/workouts/workout-history-table"
import { WorkoutLogDialog } from "@/components/workouts/workout-log-dialog"

export default function WorkoutsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div />
        <Button onClick={() => setDialogOpen(true)}>
          <IconPlus className="size-4" />
          Log Workout
        </Button>
      </div>
      <WorkoutSummaryCards />
      <WorkoutTypeChart />
      <WorkoutHistoryTable />
      <WorkoutLogDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
