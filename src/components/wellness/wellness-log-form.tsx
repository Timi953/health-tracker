"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

import type { MoodScore, SleepQuality, WellnessEntry } from "@/types"
import { MOOD_EMOJIS, SLEEP_QUALITY_LABELS } from "@/lib/constants"
import { getToday } from "@/lib/date-utils"
import { useWellness } from "@/hooks/use-wellness"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const SLEEP_QUALITY_OPTIONS: SleepQuality[] = [
  "poor",
  "fair",
  "good",
  "excellent",
]

const MOOD_SCORES: MoodScore[] = [1, 2, 3, 4, 5]

export function WellnessLogForm() {
  const { addEntry, updateEntry, getByDate } = useWellness()

  const [existingEntry, setExistingEntry] = useState<WellnessEntry | null>(
    null
  )
  const [sleepHours, setSleepHours] = useState(7)
  const [sleepQuality, setSleepQuality] = useState<SleepQuality>("good")
  const [weight, setWeight] = useState("")
  const [mood, setMood] = useState<MoodScore>(3)
  const [waterIntake, setWaterIntake] = useState(0)

  useEffect(() => {
    const today = getToday()
    const entry = getByDate(today)
    if (entry) {
      setExistingEntry(entry)
      setSleepHours(entry.sleepHours)
      setSleepQuality(entry.sleepQuality)
      setWeight(entry.weight !== undefined ? String(entry.weight) : "")
      setMood(entry.mood)
      setWaterIntake(entry.waterIntake)
    }
  }, [getByDate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData: Omit<WellnessEntry, "id" | "createdAt"> = {
      date: getToday(),
      sleepHours,
      sleepQuality,
      weight: weight !== "" ? Number(weight) : undefined,
      mood,
      waterIntake,
    }

    if (existingEntry) {
      updateEntry(existingEntry.id, formData)
      toast.success("Wellness entry updated")
    } else {
      const entry = addEntry(formData)
      setExistingEntry(entry)
      toast.success("Wellness entry saved")
    }
  }

  function handleMoodChange(groupValue: string[]) {
    if (groupValue.length > 0) {
      setMood(Number(groupValue[0]) as MoodScore)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Today&apos;s Wellness</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sleep-hours">
              Sleep Hours: {sleepHours}h
            </Label>
            <Slider
              id="sleep-hours"
              min={0}
              max={12}
              step={0.5}
              value={[sleepHours]}
              onValueChange={(val) =>
                setSleepHours(Array.isArray(val) ? val[0] : val)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Sleep Quality</Label>
            <Select
              value={sleepQuality}
              onValueChange={(val) => setSleepQuality(val as SleepQuality)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SLEEP_QUALITY_OPTIONS.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {SLEEP_QUALITY_LABELS[quality]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="weight">Weight (optional)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="e.g. 150.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Mood</Label>
            <ToggleGroup
              value={[String(mood)]}
              onValueChange={handleMoodChange}
              variant="outline"
              spacing={1}
            >
              {MOOD_SCORES.map((score) => (
                <ToggleGroupItem
                  key={score}
                  value={String(score)}
                  aria-label={`Mood ${score}`}
                >
                  <span className="text-lg">{MOOD_EMOJIS[score]}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="water-intake">Water Intake (glasses)</Label>
            <Input
              id="water-intake"
              type="number"
              min={0}
              max={20}
              value={waterIntake}
              onChange={(e) => setWaterIntake(Number(e.target.value))}
            />
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full sm:w-auto">
              {existingEntry ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
