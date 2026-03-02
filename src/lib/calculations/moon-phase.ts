import SunCalc from "suncalc";
import type { MoonPhaseInfo } from "@/lib/types";

const PHASE_NAMES: [number, string, string][] = [
  [0, "New Moon", "\u{1F311}"],
  [0.125, "Waxing Crescent", "\u{1F312}"],
  [0.25, "First Quarter", "\u{1F313}"],
  [0.375, "Waxing Gibbous", "\u{1F314}"],
  [0.5, "Full Moon", "\u{1F315}"],
  [0.625, "Waning Gibbous", "\u{1F316}"],
  [0.75, "Last Quarter", "\u{1F317}"],
  [0.875, "Waning Crescent", "\u{1F318}"],
];

export function getMoonPhase(): MoonPhaseInfo {
  const illumination = SunCalc.getMoonIllumination(new Date());

  // Find the closest phase name
  let phaseName = PHASE_NAMES[0][1];
  let emoji = PHASE_NAMES[0][2];
  let minDist = Infinity;

  for (const [threshold, name, icon] of PHASE_NAMES) {
    const dist = Math.abs(illumination.phase - threshold);
    // Also check wrap-around (0 and 1 are the same phase)
    const wrapDist = Math.abs(illumination.phase - threshold - 1);
    const actualDist = Math.min(dist, wrapDist);

    if (actualDist < minDist) {
      minDist = actualDist;
      phaseName = name;
      emoji = icon;
    }
  }

  return {
    phase: illumination.phase,
    illumination: Math.round(illumination.fraction * 100),
    phaseName,
    emoji,
  };
}
