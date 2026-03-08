"use client";

import { useState, useCallback } from "react";
import type { Meal } from "@/types";
import { nutritionRepository } from "@/data/repositories/nutrition-repository";

export function useNutrition() {
  const [meals, setMeals] = useState(() => nutritionRepository.getAll());

  const refresh = useCallback(() => {
    setMeals(nutritionRepository.getAll());
  }, []);

  const addMeal = useCallback(
    (data: Omit<Meal, "id" | "createdAt">) => {
      const meal = nutritionRepository.create(data);
      refresh();
      return meal;
    },
    [refresh]
  );

  const deleteMeal = useCallback(
    (id: string) => {
      nutritionRepository.delete(id);
      refresh();
    },
    [refresh]
  );

  const getByDate = useCallback((date: string) => {
    return nutritionRepository.getByDate(date);
  }, []);

  const getByDateRange = useCallback((start: string, end: string) => {
    return nutritionRepository.getByDateRange(start, end);
  }, []);

  const getDailyCalories = useCallback((date: string) => {
    return nutritionRepository.getDailyCalories(date);
  }, []);

  return { meals, addMeal, deleteMeal, getByDate, getByDateRange, getDailyCalories };
}
