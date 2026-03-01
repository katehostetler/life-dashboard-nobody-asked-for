import type { GradientColors } from "@/lib/types";

// Sky gradient color stops mapped to sun altitude ranges
// Sun altitude in degrees: negative = below horizon, positive = above

export interface GradientStop {
  minAltitude: number; // sun altitude in degrees
  maxAltitude: number;
  colors: GradientColors;
}

export const SKY_GRADIENTS: GradientStop[] = [
  {
    // Deep night: sun well below horizon
    minAltitude: -90,
    maxAltitude: -18,
    colors: {
      start: "#0D0A1A",
      mid: "#0F0C1E",
      end: "#141024",
    },
  },
  {
    // Astronomical twilight
    minAltitude: -18,
    maxAltitude: -12,
    colors: {
      start: "#0F0C1E",
      mid: "#1A1232",
      end: "#1C1635",
    },
  },
  {
    // Nautical twilight
    minAltitude: -12,
    maxAltitude: -6,
    colors: {
      start: "#1A1232",
      mid: "#2D1B4E",
      end: "#3D2260",
    },
  },
  {
    // Civil twilight (golden hour approaching)
    minAltitude: -6,
    maxAltitude: 0,
    colors: {
      start: "#2D1B4E",
      mid: "#5C2D5E",
      end: "#8B4049",
    },
  },
  {
    // Sunrise/sunset — warm rose and amber
    minAltitude: 0,
    maxAltitude: 10,
    colors: {
      start: "#3D2260",
      mid: "#7B3F5E",
      end: "#C4724A",
    },
  },
  {
    // Morning/evening — muted cosmic blue
    minAltitude: 10,
    maxAltitude: 30,
    colors: {
      start: "#1A1845",
      mid: "#252560",
      end: "#2D3570",
    },
  },
  {
    // Daytime — deep cosmic blue (still warm-tinted)
    minAltitude: 30,
    maxAltitude: 90,
    colors: {
      start: "#151340",
      mid: "#1C2055",
      end: "#252D65",
    },
  },
];
