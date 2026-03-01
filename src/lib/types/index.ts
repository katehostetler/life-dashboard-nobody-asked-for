// ===== NASA EPIC =====
export interface NasaEpicImage {
  identifier: string;
  caption: string;
  image: string;
  date: string;
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
  };
}

// ===== ISS =====
export interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface Astronaut {
  name: string;
  craft: string;
}

export interface AstrosResponse {
  number: number;
  people: Astronaut[];
}

// ===== Wikipedia =====
export interface WikiArticle {
  article: string;
  views: number;
  rank: number;
}

// ===== Birthday =====
export interface BirthdayStats {
  heartbeats: number;
  minutesAlive: number;
  sunOrbits: number;
  dogYears: number;
  marsSols: number;
  plutoYears: number;
}

// ===== World Stats =====
export interface WorldStat {
  label: string;
  rate: number; // per second
  unit: string;
  icon: string;
}

// ===== Geolocation =====
export interface GeoLocation {
  latitude: number;
  longitude: number;
  source: "browser" | "ip" | "default";
}

// ===== Sky Gradient =====
export interface GradientColors {
  start: string;
  mid: string;
  end: string;
}

// ===== Cosmic Facts =====
export interface CosmicFact {
  text: string;
  source: string;
}
