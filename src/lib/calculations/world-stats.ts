// Calculate the current count based on a per-second rate and time since midnight UTC
export function getCountSinceMidnightUTC(ratePerSecond: number): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setUTCHours(0, 0, 0, 0);
  const secondsSinceMidnight = (now.getTime() - midnight.getTime()) / 1000;
  return ratePerSecond * secondsSinceMidnight;
}
