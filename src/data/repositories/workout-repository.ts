import type { ID, Workout } from "@/types";
import { store } from "../store";
import type { WorkoutRepository } from "./types";

function getAll(): Workout[] {
  return Array.from(store.workouts.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function getByDate(date: string): Workout[] {
  return Array.from(store.workouts.values()).filter((w) => w.date === date);
}

function getByDateRange(startDate: string, endDate: string): Workout[] {
  return Array.from(store.workouts.values()).filter(
    (w) => w.date >= startDate && w.date <= endDate,
  );
}

function getById(id: ID): Workout | undefined {
  return store.workouts.get(id);
}

function create(workout: Omit<Workout, "id" | "createdAt">): Workout {
  const newWorkout: Workout = {
    ...workout,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.workouts.set(newWorkout.id, newWorkout);
  return newWorkout;
}

function deleteWorkout(id: ID): void {
  store.workouts.delete(id);
}

export const workoutRepository: WorkoutRepository = {
  getAll,
  getByDate,
  getByDateRange,
  getById,
  create,
  delete: deleteWorkout,
};
