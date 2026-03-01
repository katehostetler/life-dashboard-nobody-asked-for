"use client";

import { useState, useEffect } from "react";
import type { GeoLocation } from "@/lib/types";

const STORAGE_KEY = "life-dashboard-location";
const DEFAULT_LOCATION: GeoLocation = {
  latitude: 40.7128,
  longitude: -74.006,
  source: "default",
};

export function useGeolocation(): GeoLocation {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);

  useEffect(() => {
    // Check localStorage first
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as GeoLocation;
        setLocation(parsed);
        return;
      } catch {
        // Invalid cache, continue to fresh lookup
      }
    }

    // Tier 1: Browser Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const geo: GeoLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            source: "browser",
          };
          setLocation(geo);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(geo));
        },
        () => {
          // Tier 2: IP geolocation via server proxy
          fetchIPGeolocation().then((geo) => {
            if (geo) {
              setLocation(geo);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(geo));
            }
            // Tier 3: default (already set)
          });
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      fetchIPGeolocation().then((geo) => {
        if (geo) {
          setLocation(geo);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(geo));
        }
      });
    }
  }, []);

  return location;
}

async function fetchIPGeolocation(): Promise<GeoLocation | null> {
  try {
    const res = await fetch("/api/geolocation");
    if (!res.ok) return null;
    const data = await res.json();
    return {
      latitude: data.lat,
      longitude: data.lon,
      source: "ip",
    };
  } catch {
    return null;
  }
}
