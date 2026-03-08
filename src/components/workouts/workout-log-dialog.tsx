"use client"

import { useState } from "react"
import { toast } from "sonner"
import { IconPlus } from "@tabler/icons-react"

import type { Exercise } from "@/types"
import { getToday } from "@/lib/date-utils"
import { useWorkouts } from "@/hooks/use-workouts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  ExerciseSetForm,
  type ExerciseFormData,
} from "@/components/workouts/exercise-set-form"

interface WorkoutLogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function createEmptyExercise(): ExerciseFormData {
  return {
    name: "",
    type: "strength",
    sets: [{ reps: 0, weight: 0 }],
    distance: 0,
    duration: 0,
  }
}

function buildExercise(data: ExerciseFormData, index: number): Exercise {
  const exercise: Exercise = {
    id: `exercise-${Date.now()}-${index}`,
    name: data.name,
    type: data.type,
  }

  if (data.type === "strength") {
    exercise.sets = data.sets.map((set, i) => ({
      setNumber: i + 1,
      reps: set.reps,
      weight: set.weight,
    }))
  } else {
    const pace = data.distance > 0 ? data.duration / data.distance : 0
    exercise.cardioMetrics = {
      distance: data.distance,
      duration: data.duration,
      pace: Number(pace.toFixed(1)),
    }
  }

  return exercise
}

export function WorkoutLogDialog({ open, onOpenChange }: WorkoutLogDialogProps) {
  const { addWorkout } = useWorkouts()

  const [name, setName] = useState("")
  const [date, setDate] = useState(getToday())
  const [notes, setNotes] = useState("")
  const [exercises, setExercises] = useState<ExerciseFormData[]>([createEmptyExercise()])

  function resetForm() {
    setName("")
    setDate(getToday())
    setNotes("")
    setExercises([createEmptyExercise()])
  }

  function handleExerciseChange(index: number, data: ExerciseFormData) {
    setExercises((prev) =>
      prev.map((ex, i) => (i === index ? data : ex))
    )
  }

  function handleExerciseRemove(index: number) {
    setExercises((prev) => prev.filter((_, i) => i !== index))
  }

  function addExercise() {
    setExercises((prev) => [...prev, createEmptyExercise()])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || exercises.length === 0) {
      return
    }

    const validExercises = exercises.filter((ex) => ex.name.trim())
    if (validExercises.length === 0) {
      return
    }

    addWorkout({
      name: name.trim(),
      date,
      exercises: validExercises.map((ex, i) => buildExercise(ex, i)),
      notes: notes.trim() || undefined,
    })

    toast.success("Workout logged successfully")
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Workout</DialogTitle>
          <DialogDescription>
            Record a new workout session with exercises.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="workout-name">Workout Name</Label>
            <Input
              id="workout-name"
              placeholder="e.g. Upper Body Day"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="workout-date">Date</Label>
            <Input
              id="workout-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="workout-notes">Notes</Label>
            <Input
              id="workout-notes"
              placeholder="Optional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Exercises</Label>
            {exercises.map((exercise, index) => (
              <ExerciseSetForm
                key={index}
                index={index}
                data={exercise}
                onChange={handleExerciseChange}
                onRemove={handleExerciseRemove}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExercise}
            >
              <IconPlus className="size-3.5" />
              Add Exercise
            </Button>
          </div>

          <DialogFooter>
            <Button type="submit">Log Workout</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
