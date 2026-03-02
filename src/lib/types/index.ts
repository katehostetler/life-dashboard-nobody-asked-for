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

// ===== Google Trends =====
export interface TrendingSearch {
  title: string;
  traffic: string;
  url: string;
}

// ===== News Headlines =====
export interface NewsHeadline {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
}

// ===== Market Prices =====
export interface MarketPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  currency: string;
}

// ===== NASA APOD =====
export interface NasaApod {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
}

// ===== Moon Phase =====
export interface MoonPhaseInfo {
  phase: number;
  illumination: number;
  phaseName: string;
  emoji: string;
}

// ===== On This Day =====
export interface OnThisDayEvent {
  year: number;
  text: string;
  pages: { title: string; url: string }[];
}
