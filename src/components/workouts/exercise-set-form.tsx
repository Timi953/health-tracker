"use client"

import type { ExerciseType } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconPlus, IconTrash } from "@tabler/icons-react"

export interface ExerciseFormData {
  name: string
  type: ExerciseType
  sets: { reps: number; weight: number }[]
  distance: number
  duration: number
}

interface ExerciseSetFormProps {
  index: number
  data: ExerciseFormData
  onChange: (index: number, data: ExerciseFormData) => void
  onRemove: (index: number) => void
}

export function ExerciseSetForm({ index, data, onChange, onRemove }: ExerciseSetFormProps) {
  function updateField<K extends keyof ExerciseFormData>(field: K, value: ExerciseFormData[K]) {
    onChange(index, { ...data, [field]: value })
  }

  function updateSet(setIndex: number, field: "reps" | "weight", value: number) {
    const updatedSets = data.sets.map((set, i) =>
      i === setIndex ? { ...set, [field]: value } : set
    )
    updateField("sets", updatedSets)
  }

  function addSet() {
    updateField("sets", [...data.sets, { reps: 0, weight: 0 }])
  }

  function removeSet(setIndex: number) {
    updateField("sets", data.sets.filter((_, i) => i !== setIndex))
  }

  const pace =
    data.duration > 0 && data.distance > 0
      ? (data.duration / data.distance).toFixed(1) + " min/mi"
      : null

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Exercise {index + 1}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => onRemove(index)}
        >
          <IconTrash className="size-3.5" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`exercise-name-${index}`}>Name</Label>
        <Input
          id={`exercise-name-${index}`}
          placeholder="e.g. Bench Press"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Type</Label>
        <Select
          value={data.type}
          onValueChange={(val) => updateField("type", val as ExerciseType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.type === "strength" && (
        <div className="flex flex-col gap-2">
          <Label>Sets</Label>
          <div className="flex flex-col gap-2">
            {data.sets.map((set, setIndex) => (
              <div key={setIndex} className="flex items-center gap-2">
                <span className="w-6 text-center text-xs text-muted-foreground">
                  {setIndex + 1}
                </span>
                <Input
                  type="number"
                  min={0}
                  placeholder="Reps"
                  value={set.reps || ""}
                  onChange={(e) => updateSet(setIndex, "reps", Number(e.target.value))}
                  className="w-20"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Weight"
                  value={set.weight || ""}
                  onChange={(e) => updateSet(setIndex, "weight", Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-xs text-muted-foreground">lbs</span>
                {data.sets.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeSet(setIndex)}
                  >
                    <IconTrash className="size-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSet}
          >
            <IconPlus className="size-3.5" />
            Add Set
          </Button>
        </div>
      )}

      {data.type === "cardio" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`exercise-distance-${index}`}>Distance (miles)</Label>
            <Input
              id={`exercise-distance-${index}`}
              type="number"
              min={0}
              step="0.1"
              placeholder="e.g. 3.1"
              value={data.distance || ""}
              onChange={(e) => updateField("distance", Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`exercise-duration-${index}`}>Duration (min)</Label>
            <Input
              id={`exercise-duration-${index}`}
              type="number"
              min={0}
              placeholder="e.g. 30"
              value={data.duration || ""}
              onChange={(e) => updateField("duration", Number(e.target.value))}
            />
          </div>
          {pace && (
            <p className="text-sm text-muted-foreground">
              Pace: {pace}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
