export type ID = string;
export type ExerciseType = "strength" | "cardio";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type SleepQuality = "poor" | "fair" | "good" | "excellent";
export type MoodScore = 1 | 2 | 3 | 4 | 5;
export type GoalFrequency = "daily" | "weekly";
export type GoalCategory = "workouts" | "nutrition" | "wellness";

export interface StrengthSet {
  setNumber: number;
  reps: number;
  weight: number;
}

export interface CardioMetrics {
  distance: number;
  duration: number;
  pace: number;
}

export interface Exercise {
  id: ID;
  name: string;
  type: ExerciseType;
  sets?: StrengthSet[];
  cardioMetrics?: CardioMetrics;
}

export interface Workout {
  id: ID;
  date: string;
  name: string;
  exercises: Exercise[];
  notes?: string;
  createdAt: string;
}

export interface Meal {
  id: ID;
  date: string;
  name: string;
  calories: number;
  mealType: MealType;
  createdAt: string;
}

export interface WellnessEntry {
  id: ID;
  date: string;
  sleepHours: number;
  sleepQuality: SleepQuality;
  weight?: number;
  mood: MoodScore;
  waterIntake: number;
  createdAt: string;
}

export interface Goal {
  id: ID;
  name: string;
  description?: string;
  category: GoalCategory;
  frequency: GoalFrequency;
  targetValue: number;
  unit: string;
  isActive: boolean;
  createdAt: string;
}

export interface DailyTargetStatus {
  goalId: ID;
  goal: Goal;
  date: string;
  currentValue: number;
  completed: boolean;
  streak: number;
}

export interface WeeklyGoalProgress {
  goalId: ID;
  goal: Goal;
  weekStartDate: string;
  currentValue: number;
  targetValue: number;
  progressPercent: number;
  daysCompleted: number;
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  totalWorkouts: number;
  totalWaterGlasses: number;
  sleepHours: number | null;
  sleepQuality: SleepQuality | null;
  mood: MoodScore | null;
  weight: number | null;
  goalsCompleted: number;
  goalsTotal: number;
}
