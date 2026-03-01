"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook for requestAnimationFrame-based ticking counters.
 * @param initialValue Starting value
 * @param ratePerSecond How much to increment per second
 * @returns Current ticking value
 */
export function useAnimatedCounter(
  initialValue: number,
  ratePerSecond: number
): number {
  const [value, setValue] = useState(initialValue);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(initialValue);

  useEffect(() => {
    startValueRef.current = initialValue;
    startTimeRef.current = performance.now();

    if (ratePerSecond === 0) {
      setValue(initialValue);
      return;
    }

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      setValue(startValueRef.current + ratePerSecond * elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initialValue, ratePerSecond]);

  return value;
}
