"use client";

import { ReactNode, useEffect } from "react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useSkyGradient } from "@/lib/hooks/useSkyGradient";

interface SkyGradientProviderProps {
  children: ReactNode;
}

export default function SkyGradientProvider({ children }: SkyGradientProviderProps) {
  const location = useGeolocation();
  const gradient = useSkyGradient(location);

  useEffect(() => {
    document.documentElement.style.setProperty("--sky-gradient-start", gradient.start);
    document.documentElement.style.setProperty("--sky-gradient-mid", gradient.mid);
    document.documentElement.style.setProperty("--sky-gradient-end", gradient.end);
  }, [gradient]);

  return <>{children}</>;
}
