import SunCalc from "suncalc";
import { SKY_GRADIENTS } from "@/lib/constants/gradient-palettes";
import type { GradientColors } from "@/lib/types";

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t
  );
}

function lerpGradient(a: GradientColors, b: GradientColors, t: number): GradientColors {
  return {
    start: lerpColor(a.start, b.start, t),
    mid: lerpColor(a.mid, b.mid, t),
    end: lerpColor(a.end, b.end, t),
  };
}

export function calculateSkyGradient(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): GradientColors {
  const sunPosition = SunCalc.getPosition(date, latitude, longitude);
  const altitudeDeg = (sunPosition.altitude * 180) / Math.PI;

  // Find the two gradient stops to interpolate between
  for (let i = 0; i < SKY_GRADIENTS.length - 1; i++) {
    const current = SKY_GRADIENTS[i];
    const next = SKY_GRADIENTS[i + 1];

    if (altitudeDeg >= current.minAltitude && altitudeDeg < current.maxAltitude) {
      // Interpolate within this band
      const t = (altitudeDeg - current.minAltitude) / (current.maxAltitude - current.minAltitude);

      // If near the boundary, blend with the next band
      if (t > 0.7 && i < SKY_GRADIENTS.length - 1) {
        const blendT = (t - 0.7) / 0.3; // 0 to 1 in the last 30%
        return lerpGradient(current.colors, next.colors, blendT);
      }

      return current.colors;
    }
  }

  // Default: deep night
  return SKY_GRADIENTS[0].colors;
}
