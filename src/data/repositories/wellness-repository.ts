import type { ID, WellnessEntry } from "@/types";
import { store } from "../store";
import type { WellnessRepository } from "./types";

function getAll(): WellnessEntry[] {
  return Array.from(store.wellness.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function getByDate(date: string): WellnessEntry | undefined {
  return Array.from(store.wellness.values()).find((w) => w.date === date);
}

function getByDateRange(startDate: string, endDate: string): WellnessEntry[] {
  return Array.from(store.wellness.values()).filter(
    (w) => w.date >= startDate && w.date <= endDate,
  );
}

function create(
  entry: Omit<WellnessEntry, "id" | "createdAt">,
): WellnessEntry {
  const newEntry: WellnessEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.wellness.set(newEntry.id, newEntry);
  return newEntry;
}

function update(id: ID, partial: Partial<WellnessEntry>): WellnessEntry {
  const existing = store.wellness.get(id);
  if (!existing) {
    throw new Error(`Wellness entry with id "${id}" not found`);
  }

  const updated: WellnessEntry = { ...existing, ...partial, id: existing.id };
  store.wellness.set(id, updated);
  return updated;
}

export const wellnessRepository: WellnessRepository = {
  getAll,
  getByDate,
  getByDateRange,
  create,
  update,
};
