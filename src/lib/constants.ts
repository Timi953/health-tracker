import type { MealType, MoodScore, SleepQuality } from "@/types";

export const CHART_COLORS = {
  primary: "#39ff14",
  secondary: "rgba(57, 255, 20, 0.7)",
  tertiary: "rgba(57, 255, 20, 0.45)",
  quaternary: "rgba(57, 255, 20, 0.25)",
  gray: "#9ca3af",
  darkGreen: "#1a8f0a",
} as const;

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

export const MOOD_LABELS: Record<MoodScore, string> = {
  1: "Terrible",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export const MOOD_EMOJIS: Record<MoodScore, string> = {
  1: "\u{1F62B}",
  2: "\u{1F61F}",
  3: "\u{1F610}",
  4: "\u{1F642}",
  5: "\u{1F604}",
};

export const SLEEP_QUALITY_LABELS: Record<SleepQuality, string> = {
  poor: "Poor",
  fair: "Fair",
  good: "Good",
  excellent: "Excellent",
};

export const DEFAULT_DAILY_CALORIE_TARGET = 2200;
export const DEFAULT_WATER_TARGET = 8;
export const DEFAULT_SLEEP_TARGET = 7;
