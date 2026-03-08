"use client"

import { useMemo } from "react"

import type { MoodScore } from "@/types"
import { SLEEP_QUALITY_LABELS } from "@/lib/constants"
import { formatDate } from "@/lib/date-utils"
import { useWellness } from "@/hooks/use-wellness"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoodIndicator } from "@/components/shared/mood-indicator"

export function WellnessHistoryTable() {
  const { entries } = useWellness()

  const sortedEntries = useMemo(() => {
    return [...entries]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 30)
  }, [entries])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wellness History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Sleep</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Water</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{formatDate(entry.date)}</TableCell>
                <TableCell>
                  {entry.sleepHours}h{" "}
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {SLEEP_QUALITY_LABELS[entry.sleepQuality]}
                  </span>
                </TableCell>
                <TableCell>
                  {entry.weight !== undefined ? entry.weight : "—"}
                </TableCell>
                <TableCell>
                  <MoodIndicator score={entry.mood as MoodScore} />
                </TableCell>
                <TableCell>{entry.waterIntake} glasses</TableCell>
              </TableRow>
            ))}
            {sortedEntries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No entries yet. Log your first wellness entry above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
