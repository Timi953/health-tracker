"use client";

import { useState, useCallback } from "react";
import type { Workout } from "@/types";
import { workoutRepository } from "@/data/repositories/workout-repository";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState(() => workoutRepository.getAll());

  const refresh = useCallback(() => {
    setWorkouts(workoutRepository.getAll());
  }, []);

  const addWorkout = useCallback(
    (data: Omit<Workout, "id" | "createdAt">) => {
      const workout = workoutRepository.create(data);
      refresh();
      return workout;
    },
    [refresh]
  );

  const deleteWorkout = useCallback(
    (id: string) => {
      workoutRepository.delete(id);
      refresh();
    },
    [refresh]
  );

  const getByDate = useCallback((date: string) => {
    return workoutRepository.getByDate(date);
  }, []);

  const getByDateRange = useCallback((start: string, end: string) => {
    return workoutRepository.getByDateRange(start, end);
  }, []);

  return { workouts, addWorkout, deleteWorkout, getByDate, getByDateRange };
}
