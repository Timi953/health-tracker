"use client"

import { DailySummaryCards } from "@/components/dashboard/daily-summary-cards"
import { DailyProgressRings } from "@/components/dashboard/daily-progress-rings"
import { ActivityOverviewChart } from "@/components/dashboard/activity-overview-chart"
import { RecentActivityList } from "@/components/dashboard/recent-activity-list"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <DailySummaryCards />
      <div className="flex justify-center px-4 lg:px-6">
        <DailyProgressRings />
      </div>
      <div className="px-4 lg:px-6">
        <ActivityOverviewChart />
      </div>
      <div className="px-4 lg:px-6">
        <RecentActivityList />
      </div>
    </div>
  )
}
