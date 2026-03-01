"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "life-dashboard-birthday";

export function useBirthday() {
  const [birthday, setBirthdayState] = useState<Date | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = new Date(stored);
      if (!isNaN(parsed.getTime())) {
        setBirthdayState(parsed);
      }
    }
    setIsLoaded(true);
  }, []);

  const setBirthday = useCallback((date: Date) => {
    localStorage.setItem(STORAGE_KEY, date.toISOString());
    setBirthdayState(date);
  }, []);

  const clearBirthday = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setBirthdayState(null);
  }, []);

  return { birthday, setBirthday, clearBirthday, isLoaded };
}
