import type { OnThisDayEvent } from "@/lib/types";

export async function fetchOnThisDay(
  limit: number = 3
): Promise<OnThisDayEvent[]> {
  try {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
      {
        headers: { "User-Agent": "LifeDashboard/1.0 (kate@example.com)" },
        next: { revalidate: 86400 }, // 24 hours
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const events = data?.events;
    if (!Array.isArray(events) || events.length === 0) return [];

    // Pick one event from each era for a spread of history
    const eras = [
      { max: 1500 },   // Ancient / medieval
      { max: 1850 },   // Early modern
      { max: 1950 },   // Industrial / world wars
      { max: 1990 },   // Late 20th century
      { max: 9999 },   // Modern (1990+)
    ];

    const selected: OnThisDayEvent[] = [];
    const used = new Set<number>();

    for (const era of eras) {
      if (selected.length >= limit) break;
      const prev = selected.length > 0 ? eras[eras.indexOf(era) - 1]?.max ?? 0 : 0;
      const candidates = events.filter(
        (e: { year: number }) => e.year > prev && e.year <= era.max && !used.has(e.year)
      );
      if (candidates.length > 0) {
        // Pick a random one from this era
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        used.add(pick.year);
        selected.push({
          year: pick.year,
          text: pick.text,
          pages: (pick.pages || [])
            .slice(0, 2)
            .map(
              (p: {
                title: string;
                content_urls?: { desktop?: { page?: string } };
              }) => ({
                title: p.title,
                url:
                  p.content_urls?.desktop?.page ||
                  `https://en.wikipedia.org/wiki/${encodeURIComponent(p.title)}`,
              })
            ),
        });
      }
    }

    // Sort chronologically for display
    selected.sort((a, b) => a.year - b.year);
    return selected;
  } catch {
    return [];
  }
}
