"use client"

import { WellnessLogForm } from "@/components/wellness/wellness-log-form"
import { SleepTrendChart } from "@/components/wellness/sleep-trend-chart"
import { WeightTrendChart } from "@/components/wellness/weight-trend-chart"
import { MoodTrendChart } from "@/components/wellness/mood-trend-chart"
import { WaterIntakeChart } from "@/components/wellness/water-intake-chart"
import { WellnessHistoryTable } from "@/components/wellness/wellness-history-table"

export default function WellnessPage() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <WellnessLogForm />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SleepTrendChart />
        <WeightTrendChart />
        <MoodTrendChart />
        <WaterIntakeChart />
      </div>
      <WellnessHistoryTable />
    </div>
  )
}
