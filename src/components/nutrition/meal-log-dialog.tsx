"use client"

import { useState } from "react"
import { toast } from "sonner"

import type { MealType } from "@/types"
import { getToday } from "@/lib/date-utils"
import { MEAL_TYPE_LABELS } from "@/lib/constants"
import { useNutrition } from "@/hooks/use-nutrition"
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

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"]

interface MealLogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MealLogDialog({ open, onOpenChange }: MealLogDialogProps) {
  const { addMeal } = useNutrition()

  const [name, setName] = useState("")
  const [mealType, setMealType] = useState<MealType>("breakfast")
  const [calories, setCalories] = useState("")
  const [date, setDate] = useState(getToday())

  function resetForm() {
    setName("")
    setMealType("breakfast")
    setCalories("")
    setDate(getToday())
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !calories) {
      return
    }

    addMeal({
      name: name.trim(),
      mealType,
      calories: Number(calories),
      date,
    })

    toast.success("Meal logged successfully")
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Meal</DialogTitle>
          <DialogDescription>
            Add a new meal to your nutrition log.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="meal-name">Meal Name</Label>
            <Input
              id="meal-name"
              placeholder="e.g. Grilled Chicken Salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Meal Type</Label>
            <Select
              value={mealType}
              onValueChange={(val) => setMealType(val as MealType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEAL_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {MEAL_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="meal-calories">Calories</Label>
            <Input
              id="meal-calories"
              type="number"
              min={0}
              placeholder="e.g. 450"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="meal-date">Date</Label>
            <Input
              id="meal-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Log Meal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
