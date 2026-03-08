import type {
  DailyTargetStatus,
  Goal,
  ID,
  WeeklyGoalProgress,
} from "@/types";
import { getDaysAgo, getDateRange } from "@/lib/date-utils";
import { store } from "../store";
import type { GoalRepository } from "./types";

function getAll(): Goal[] {
  return Array.from(store.goals.values());
}

function getActive(): Goal[] {
  return Array.from(store.goals.values()).filter((g) => g.isActive);
}

function getById(id: ID): Goal | undefined {
  return store.goals.get(id);
}

function create(goal: Omit<Goal, "id" | "createdAt">): Goal {
  const newGoal: Goal = {
    ...goal,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.goals.set(newGoal.id, newGoal);
  return newGoal;
}

function deleteGoal(id: ID): void {
  store.goals.delete(id);
}

function getMealsForDate(date: string) {
  return Array.from(store.meals.values()).filter((m) => m.date === date);
}

function getWorkoutsForDate(date: string) {
  return Array.from(store.workouts.values()).filter((w) => w.date === date);
}

function getWellnessForDate(date: string) {
  return Array.from(store.wellness.values()).find((w) => w.date === date);
}

function computeDailyValue(goal: Goal, date: string): number {
  if (goal.category === "wellness") {
    const entry = getWellnessForDate(date);
    if (!entry) return 0;

    if (goal.unit === "glasses") return entry.waterIntake;
    if (goal.unit === "hours") return entry.sleepHours;
    return 0;
  }

  if (goal.category === "nutrition") {
    const meals = getMealsForDate(date);

    if (goal.unit === "calories") {
      return meals.reduce((sum, m) => sum + m.calories, 0);
    }
    if (goal.unit === "meals") {
      return meals.length;
    }
    return 0;
  }

  if (goal.category === "workouts") {
    const workouts = getWorkoutsForDate(date);

    if (goal.unit === "minutes") {
      return workouts.reduce((total, w) => {
        const exerciseMinutes = w.exercises.reduce((sum, ex) => {
          if (ex.cardioMetrics) return sum + ex.cardioMetrics.duration;
          // Estimate ~2 minutes per set for strength exercises
          if (ex.sets) return sum + ex.sets.length * 2;
          return sum;
        }, 0);
        return total + exerciseMinutes;
      }, 0);
    }
    return 0;
  }

  return 0;
}

function isGoalCompleted(goal: Goal, currentValue: number): boolean {
  // For calorie goals, "under" means completed when value is at or below target
  if (goal.unit === "calories") {
    return currentValue <= goal.targetValue && currentValue > 0;
  }
  return currentValue >= goal.targetValue;
}

function computeStreak(goal: Goal, date: string): number {
  let streak = 0;
  let checkDay = 1;

  while (true) {
    const pastDate = getDaysAgo(
      daysBetween(date, getDaysAgo(0)) + checkDay,
    );
    const value = computeDailyValue(goal, pastDate);
    if (!isGoalCompleted(goal, value)) break;
    streak++;
    checkDay++;
    // Cap streak computation at 60 days to prevent runaway loops
    if (checkDay > 60) break;
  }

  return streak;
}

function daysBetween(dateStr: string, todayStr: string): number {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date(todayStr + "T00:00:00");
  return Math.round(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function getDailyTargetStatuses(date: string): DailyTargetStatus[] {
  const activeDaily = getActive().filter((g) => g.frequency === "daily");

  return activeDaily.map((goal) => {
    const currentValue = computeDailyValue(goal, date);
    const completed = isGoalCompleted(goal, currentValue);
    const streak = computeStreak(goal, date);

    return {
      goalId: goal.id,
      goal,
      date,
      currentValue,
      completed,
      streak,
    };
  });
}

function getWeeklyGoalProgress(weekStartDate: string): WeeklyGoalProgress[] {
  const activeWeekly = getActive().filter((g) => g.frequency === "weekly");
  const endDate = new Date(weekStartDate + "T00:00:00");
  endDate.setDate(endDate.getDate() + 6);
  const weekEndDate = endDate.toISOString().split("T")[0];
  const dates = getDateRange(weekStartDate, weekEndDate);

  return activeWeekly.map((goal) => {
    let currentValue = 0;
    let daysCompleted = 0;

    if (goal.category === "workouts" && goal.unit === "workouts") {
      const workoutsInRange = Array.from(store.workouts.values()).filter(
        (w) => w.date >= weekStartDate && w.date <= weekEndDate,
      );
      currentValue = workoutsInRange.length;

      // Count unique days with workouts
      const workoutDays = new Set(workoutsInRange.map((w) => w.date));
      daysCompleted = workoutDays.size;
    } else {
      // For other weekly goals, aggregate daily values
      for (const date of dates) {
        const dailyValue = computeDailyValue(goal, date);
        currentValue += dailyValue;
        if (isGoalCompleted(goal, dailyValue)) {
          daysCompleted++;
        }
      }
    }

    const progressPercent = Math.min(
      Math.round((currentValue / goal.targetValue) * 100),
      100,
    );

    return {
      goalId: goal.id,
      goal,
      weekStartDate,
      currentValue,
      targetValue: goal.targetValue,
      progressPercent,
      daysCompleted,
    };
  });
}

export const goalRepository: GoalRepository = {
  getAll,
  getActive,
  getById,
  create,
  delete: deleteGoal,
  getDailyTargetStatuses,
  getWeeklyGoalProgress,
};
