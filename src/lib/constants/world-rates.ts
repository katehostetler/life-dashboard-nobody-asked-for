import type { WorldStat } from "@/lib/types";

// Statistical rates for global counters
// Sources: various UN, industry, and scientific reports
export const WORLD_STATS: WorldStat[] = [
  {
    label: "Flights in the Air",
    rate: 0, // fetched from OpenSky API, not rate-based
    unit: "flights",
    icon: "plane",
  },
  {
    label: "Babies Born Today",
    rate: 4.3, // ~385,000/day ÷ 86400 seconds
    unit: "babies",
    icon: "baby",
  },
  {
    label: "Google Searches Today",
    rate: 99000, // ~8.5 billion/day
    unit: "searches",
    icon: "search",
  },
  {
    label: "Emails Sent Today",
    rate: 3800, // ~333 billion/day
    unit: "emails",
    icon: "mail",
  },
  {
    label: "CO₂ Emitted Today",
    rate: 1540, // ~133 million tons/day ÷ 86400
    unit: "tons",
    icon: "cloud",
  },
  {
    label: "Trees Cut Down Today",
    rate: 4.6, // ~400,000/day ÷ 86400
    unit: "trees",
    icon: "tree",
  },
];

// Average heartbeats per minute (resting adult average)
export const AVG_HEARTBEAT_BPM = 70;

// Voyager 1 reference: ~152.8 AU from Sun on Jan 1, 2024
// Traveling at ~3.6 AU/year
export const VOYAGER_REFERENCE = {
  au: 152.8,
  referenceDate: new Date("2024-01-01T00:00:00Z"),
  auPerYear: 3.6,
};
