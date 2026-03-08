"use client"

import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"

import { DailyTargetsList } from "@/components/goals/daily-targets-list"
import { GoalFormDialog } from "@/components/goals/goal-form-dialog"
import { WeeklyGoalsList } from "@/components/goals/weekly-goals-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GoalsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <Tabs defaultValue="daily">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">Daily Targets</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Goals</TabsTrigger>
          </TabsList>
          <Button onClick={() => setDialogOpen(true)}>
            <IconPlus className="size-4" />
            New Goal
          </Button>
        </div>
        <TabsContent value="daily">
          <DailyTargetsList />
        </TabsContent>
        <TabsContent value="weekly">
          <WeeklyGoalsList />
        </TabsContent>
      </Tabs>
      <GoalFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
