import type { MoodScore, SleepQuality, WellnessEntry } from "@/types";
import { getDaysAgo } from "@/lib/date-utils";

const sleepPatterns: Array<{ hours: number; quality: SleepQuality }> = [
  { hours: 7.5, quality: "good" },
  { hours: 6.0, quality: "fair" },
  { hours: 8.0, quality: "excellent" },
  { hours: 7.0, quality: "good" },
  { hours: 5.5, quality: "poor" },
  { hours: 8.5, quality: "excellent" },
  { hours: 6.5, quality: "fair" },
  { hours: 7.5, quality: "good" },
  { hours: 9.0, quality: "excellent" },
  { hours: 6.0, quality: "poor" },
  { hours: 7.0, quality: "good" },
  { hours: 8.0, quality: "good" },
  { hours: 6.5, quality: "fair" },
  { hours: 7.5, quality: "good" },
  { hours: 7.0, quality: "fair" },
  { hours: 8.5, quality: "excellent" },
  { hours: 6.0, quality: "fair" },
  { hours: 7.5, quality: "good" },
  { hours: 8.0, quality: "good" },
  { hours: 5.5, quality: "poor" },
  { hours: 7.0, quality: "good" },
  { hours: 7.5, quality: "good" },
  { hours: 6.5, quality: "fair" },
  { hours: 8.0, quality: "excellent" },
  { hours: 7.0, quality: "good" },
  { hours: 6.0, quality: "fair" },
  { hours: 7.5, quality: "good" },
  { hours: 8.5, quality: "excellent" },
  { hours: 7.0, quality: "good" },
  { hours: 6.5, quality: "fair" },
];

const moods: MoodScore[] = [
  4, 3, 4, 3, 2, 5, 3, 4, 5, 2,
  3, 4, 3, 4, 3, 5, 3, 4, 4, 1,
  3, 4, 3, 5, 4, 3, 4, 5, 4, 3,
];

const waterIntakes: number[] = [
  8, 6, 10, 7, 5, 9, 8, 7, 11, 4,
  8, 9, 6, 8, 7, 10, 5, 8, 9, 6,
  7, 8, 6, 12, 8, 7, 9, 10, 8, 7,
];

const weights: number[] = [
  176.2, 175.8, 175.4, 176.0, 175.6, 174.8, 175.2, 175.0, 174.6, 175.4,
  175.0, 174.8, 175.2, 174.6, 175.0, 174.4, 174.8, 175.0, 174.2, 175.6,
  174.6, 174.4, 175.0, 174.0, 174.6, 174.8, 174.2, 173.8, 174.4, 174.0,
];

function buildWellnessEntries(): WellnessEntry[] {
  const entries: WellnessEntry[] = [];

  for (let day = 29; day >= 0; day--) {
    const index = 29 - day;
    const date = getDaysAgo(day);
    const sleep = sleepPatterns[index];

    entries.push({
      id: `we${index + 1}`,
      date,
      sleepHours: sleep.hours,
      sleepQuality: sleep.quality,
      weight: weights[index],
      mood: moods[index],
      waterIntake: waterIntakes[index],
      createdAt: date + "T07:00:00.000Z",
    });
  }

  return entries;
}

export const mockWellness: WellnessEntry[] = buildWellnessEntries();
