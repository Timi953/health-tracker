import type { Goal, Meal, WellnessEntry, Workout } from "@/types";
import { mockGoals } from "./mock/goals";
import { mockMeals } from "./mock/nutrition";
import { mockWellness } from "./mock/wellness";
import { mockWorkouts } from "./mock/workouts";

export const store = {
  workouts: new Map<string, Workout>(mockWorkouts.map((w) => [w.id, w])),
  meals: new Map<string, Meal>(mockMeals.map((m) => [m.id, m])),
  wellness: new Map<string, WellnessEntry>(mockWellness.map((w) => [w.id, w])),
  goals: new Map<string, Goal>(mockGoals.map((g) => [g.id, g])),
};
