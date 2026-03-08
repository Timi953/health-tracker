"use client";

import { useState, useCallback } from "react";
import type { Goal } from "@/types";
import { goalRepository } from "@/data/repositories/goal-repository";

export function useGoals() {
  const [goals, setGoals] = useState(() => goalRepository.getAll());

  const refresh = useCallback(() => {
    setGoals(goalRepository.getAll());
  }, []);

  const addGoal = useCallback(
    (data: Omit<Goal, "id" | "createdAt">) => {
      const goal = goalRepository.create(data);
      refresh();
      return goal;
    },
    [refresh]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      goalRepository.delete(id);
      refresh();
    },
    [refresh]
  );

  const getActive = useCallback(() => {
    return goalRepository.getActive();
  }, []);

  const getDailyTargetStatuses = useCallback((date: string) => {
    return goalRepository.getDailyTargetStatuses(date);
  }, []);

  const getWeeklyGoalProgress = useCallback((weekStartDate: string) => {
    return goalRepository.getWeeklyGoalProgress(weekStartDate);
  }, []);

  return {
    goals,
    addGoal,
    deleteGoal,
    getActive,
    getDailyTargetStatuses,
    getWeeklyGoalProgress,
  };
}
