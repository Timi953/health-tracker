import type {
  DailyTargetStatus,
  Goal,
  ID,
  Meal,
  WellnessEntry,
  WeeklyGoalProgress,
  Workout,
} from "@/types";

export interface WorkoutRepository {
  getAll(): Workout[];
  getByDate(date: string): Workout[];
  getByDateRange(startDate: string, endDate: string): Workout[];
  getById(id: ID): Workout | undefined;
  create(workout: Omit<Workout, "id" | "createdAt">): Workout;
  delete(id: ID): void;
}

export interface NutritionRepository {
  getAll(): Meal[];
  getByDate(date: string): Meal[];
  getByDateRange(startDate: string, endDate: string): Meal[];
  getById(id: ID): Meal | undefined;
  create(meal: Omit<Meal, "id" | "createdAt">): Meal;
  delete(id: ID): void;
  getDailyCalories(date: string): number;
}

export interface WellnessRepository {
  getAll(): WellnessEntry[];
  getByDate(date: string): WellnessEntry | undefined;
  getByDateRange(startDate: string, endDate: string): WellnessEntry[];
  create(entry: Omit<WellnessEntry, "id" | "createdAt">): WellnessEntry;
  update(id: ID, entry: Partial<WellnessEntry>): WellnessEntry;
}

export interface GoalRepository {
  getAll(): Goal[];
  getActive(): Goal[];
  getById(id: ID): Goal | undefined;
  create(goal: Omit<Goal, "id" | "createdAt">): Goal;
  delete(id: ID): void;
  getDailyTargetStatuses(date: string): DailyTargetStatus[];
  getWeeklyGoalProgress(weekStartDate: string): WeeklyGoalProgress[];
}
