"use client"

import { useMemo } from "react"

import type { Workout } from "@/types"
import { formatDate } from "@/lib/date-utils"
import { useWorkouts } from "@/hooks/use-workouts"
import { Badge } from "@/components/ui/badge"
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

function getWorkoutType(workout: Workout): "Strength" | "Cardio" | "Mixed" {
  const hasStrength = workout.exercises.some((e) => e.type === "strength")
  const hasCardio = workout.exercises.some((e) => e.type === "cardio")

  if (hasStrength && hasCardio) return "Mixed"
  if (hasCardio) return "Cardio"
  return "Strength"
}

function getTypeBadgeVariant(type: string): "default" | "secondary" | "outline" {
  switch (type) {
    case "Strength":
      return "default"
    case "Cardio":
      return "secondary"
    default:
      return "outline"
  }
}

export function WorkoutHistoryTable() {
  const { workouts } = useWorkouts()

  const sortedWorkouts = useMemo(
    () => [...workouts].sort((a, b) => b.date.localeCompare(a.date)),
    [workouts]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Workout Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Exercises</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedWorkouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No workouts logged yet
                </TableCell>
              </TableRow>
            ) : (
              sortedWorkouts.map((workout) => {
                const type = getWorkoutType(workout)
                return (
                  <TableRow key={workout.id}>
                    <TableCell>{formatDate(workout.date)}</TableCell>
                    <TableCell>{workout.name}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(type)}>
                        {type}
                      </Badge>
                    </TableCell>
                    <TableCell>{workout.exercises.length}</TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
