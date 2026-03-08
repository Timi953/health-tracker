import type { ID, Meal } from "@/types";
import { store } from "../store";
import type { NutritionRepository } from "./types";

function getAll(): Meal[] {
  return Array.from(store.meals.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function getByDate(date: string): Meal[] {
  return Array.from(store.meals.values()).filter((m) => m.date === date);
}

function getByDateRange(startDate: string, endDate: string): Meal[] {
  return Array.from(store.meals.values()).filter(
    (m) => m.date >= startDate && m.date <= endDate,
  );
}

function getById(id: ID): Meal | undefined {
  return store.meals.get(id);
}

function create(meal: Omit<Meal, "id" | "createdAt">): Meal {
  const newMeal: Meal = {
    ...meal,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.meals.set(newMeal.id, newMeal);
  return newMeal;
}

function deleteMeal(id: ID): void {
  store.meals.delete(id);
}

function getDailyCalories(date: string): number {
  return getByDate(date).reduce((sum, meal) => sum + meal.calories, 0);
}

export const nutritionRepository: NutritionRepository = {
  getAll,
  getByDate,
  getByDateRange,
  getById,
  create,
  delete: deleteMeal,
  getDailyCalories,
};
