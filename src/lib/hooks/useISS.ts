"use client";

import useSWR from "swr";
import type { ISSPosition, AstrosResponse } from "@/lib/types";

const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useISS() {
  const { data: issData, error: issError } = useSWR<ISSPosition>(
    ISS_API,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  const { data: astrosData } = useSWR<AstrosResponse>(
    "/api/iss",
    fetcher,
    {
      refreshInterval: 60000, // check every minute
      revalidateOnFocus: false,
    }
  );

  return {
    position: issData
      ? {
          latitude: issData.latitude,
          longitude: issData.longitude,
          altitude: issData.altitude,
          velocity: issData.velocity,
          timestamp: issData.timestamp || Date.now() / 1000,
        }
      : null,
    astronautCount: astrosData?.number ?? null,
    astronauts: astrosData?.people ?? [],
    isLoading: !issData && !issError,
    error: issError,
  };
}
