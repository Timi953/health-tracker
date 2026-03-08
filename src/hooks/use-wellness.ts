"use client";

import { useState, useCallback } from "react";
import type { WellnessEntry } from "@/types";
import { wellnessRepository } from "@/data/repositories/wellness-repository";

export function useWellness() {
  const [entries, setEntries] = useState(() => wellnessRepository.getAll());

  const refresh = useCallback(() => {
    setEntries(wellnessRepository.getAll());
  }, []);

  const addEntry = useCallback(
    (data: Omit<WellnessEntry, "id" | "createdAt">) => {
      const entry = wellnessRepository.create(data);
      refresh();
      return entry;
    },
    [refresh]
  );

  const updateEntry = useCallback(
    (id: string, data: Partial<WellnessEntry>) => {
      const entry = wellnessRepository.update(id, data);
      refresh();
      return entry;
    },
    [refresh]
  );

  const getByDate = useCallback((date: string) => {
    return wellnessRepository.getByDate(date);
  }, []);

  const getByDateRange = useCallback((start: string, end: string) => {
    return wellnessRepository.getByDateRange(start, end);
  }, []);

  return { entries, addEntry, updateEntry, getByDate, getByDateRange };
}
