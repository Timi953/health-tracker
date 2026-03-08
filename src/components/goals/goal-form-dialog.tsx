"use client"

import { useState } from "react"
import { toast } from "sonner"

import type { GoalCategory, GoalFrequency } from "@/types"
import { useGoals } from "@/hooks/use-goals"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES: { value: GoalCategory; label: string }[] = [
  { value: "workouts", label: "Workouts" },
  { value: "nutrition", label: "Nutrition" },
  { value: "wellness", label: "Wellness" },
]

const FREQUENCIES: { value: GoalFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
]

interface GoalFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GoalFormDialog({ open, onOpenChange }: GoalFormDialogProps) {
  const { addGoal } = useGoals()

  const [name, setName] = useState("")
  const [category, setCategory] = useState<GoalCategory>("workouts")
  const [frequency, setFrequency] = useState<GoalFrequency>("daily")
  const [targetValue, setTargetValue] = useState("")
  const [unit, setUnit] = useState("")

  function resetForm() {
    setName("")
    setCategory("workouts")
    setFrequency("daily")
    setTargetValue("")
    setUnit("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !targetValue || !unit.trim()) {
      return
    }

    addGoal({
      name: name.trim(),
      category,
      frequency,
      targetValue: Number(targetValue),
      unit: unit.trim(),
      isActive: true,
    })

    toast.success("Goal created successfully")
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Goal</DialogTitle>
          <DialogDescription>
            Set a new health goal to track your progress.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-name">Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g. Drink water"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as GoalCategory)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Frequency</Label>
            <Select
              value={frequency}
              onValueChange={(val) => setFrequency(val as GoalFrequency)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCIES.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-target">Target Value</Label>
            <Input
              id="goal-target"
              type="number"
              min={1}
              placeholder="e.g. 8"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-unit">Unit</Label>
            <Input
              id="goal-unit"
              placeholder="e.g. glasses, hours, workouts"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
