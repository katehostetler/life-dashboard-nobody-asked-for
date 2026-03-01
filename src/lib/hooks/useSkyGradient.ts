"use client";

import { useState, useEffect } from "react";
import { calculateSkyGradient } from "@/lib/calculations/sky-gradient";
import type { GradientColors, GeoLocation } from "@/lib/types";

export function useSkyGradient(location: GeoLocation): GradientColors {
  const [gradient, setGradient] = useState<GradientColors>(() =>
    calculateSkyGradient(location.latitude, location.longitude)
  );

  useEffect(() => {
    // Calculate immediately
    setGradient(calculateSkyGradient(location.latitude, location.longitude));

    // Update every 60 seconds
    const interval = setInterval(() => {
      setGradient(calculateSkyGradient(location.latitude, location.longitude));
    }, 60000);

    return () => clearInterval(interval);
  }, [location.latitude, location.longitude]);

  return gradient;
}
