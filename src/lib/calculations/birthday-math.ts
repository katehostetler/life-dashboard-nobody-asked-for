import { AVG_HEARTBEAT_BPM } from "@/lib/constants/world-rates";
import type { BirthdayStats } from "@/lib/types";

const MS_PER_MINUTE = 60_000;
const MS_PER_YEAR = 365.25 * 24 * 60 * MS_PER_MINUTE;
const MARS_SOL_IN_MS = 24 * 60 * 60 * 1000 + 39 * 60 * 1000 + 35 * 1000; // ~24h 39m 35s
const PLUTO_YEAR_IN_MS = 248 * MS_PER_YEAR; // ~248 Earth years

export function calculateBirthdayStats(birthday: Date, now: Date = new Date()): BirthdayStats {
  const msAlive = now.getTime() - birthday.getTime();
  const minutesAlive = msAlive / MS_PER_MINUTE;

  return {
    heartbeats: minutesAlive * AVG_HEARTBEAT_BPM,
    minutesAlive,
    sunOrbits: msAlive / MS_PER_YEAR,
    dogYears: (msAlive / MS_PER_YEAR) * 7,
    marsSols: msAlive / MARS_SOL_IN_MS,
    plutoYears: msAlive / PLUTO_YEAR_IN_MS,
  };
}

// Rates per second for ticking
export function getBirthdayRates() {
  return {
    heartbeats: AVG_HEARTBEAT_BPM / 60, // ~1.17/sec
    minutesAlive: 1 / 60, // 1 minute per 60 seconds
    sunOrbits: 1 / (365.25 * 24 * 3600), // per second
  };
}
