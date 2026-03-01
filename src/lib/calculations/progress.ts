import SunCalc from "suncalc";

export function getYearProgress(now: Date = new Date()): number {
  const year = now.getFullYear();
  const yearStart = new Date(year, 0, 1).getTime();
  const yearEnd = new Date(year + 1, 0, 1).getTime();
  return ((now.getTime() - yearStart) / (yearEnd - yearStart)) * 100;
}

interface SeasonInfo {
  name: string;
  progress: number;
}

export function getSeasonProgress(now: Date = new Date()): SeasonInfo {
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  // Northern hemisphere seasons (approximate equinox/solstice dates)
  const seasons = [
    { name: "Winter", start: new Date(year - 1, 11, 21), end: new Date(year, 2, 20) },
    { name: "Spring", start: new Date(year, 2, 20), end: new Date(year, 5, 21) },
    { name: "Summer", start: new Date(year, 5, 21), end: new Date(year, 8, 22) },
    { name: "Autumn", start: new Date(year, 8, 22), end: new Date(year, 11, 21) },
    { name: "Winter", start: new Date(year, 11, 21), end: new Date(year + 1, 2, 20) },
  ];

  for (const season of seasons) {
    if (now >= season.start && now < season.end) {
      const total = season.end.getTime() - season.start.getTime();
      const elapsed = now.getTime() - season.start.getTime();
      return {
        name: season.name,
        progress: (elapsed / total) * 100,
      };
    }
  }

  // Fallback: treat as winter
  return { name: "Winter", progress: 50 };
}

export function getDaylightProgress(
  latitude: number,
  longitude: number,
  now: Date = new Date()
): { progress: number; sunriseTime: string; sunsetTime: string } {
  const times = SunCalc.getTimes(now, latitude, longitude);
  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (now < sunrise) {
    return { progress: 0, sunriseTime: formatTime(sunrise), sunsetTime: formatTime(sunset) };
  }
  if (now > sunset) {
    return { progress: 100, sunriseTime: formatTime(sunrise), sunsetTime: formatTime(sunset) };
  }

  const totalDaylight = sunset.getTime() - sunrise.getTime();
  const elapsed = now.getTime() - sunrise.getTime();

  return {
    progress: (elapsed / totalDaylight) * 100,
    sunriseTime: formatTime(sunrise),
    sunsetTime: formatTime(sunset),
  };
}
