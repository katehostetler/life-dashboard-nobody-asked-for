import type { ISSPosition } from "@/lib/types";

const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";

export async function fetchISSPosition(): Promise<ISSPosition | null> {
  try {
    const res = await fetch(ISS_API);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      altitude: data.altitude,
      velocity: data.velocity,
      timestamp: data.timestamp,
    };
  } catch {
    return null;
  }
}
