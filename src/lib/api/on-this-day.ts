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

    // Pick events from different centuries for variety
    const sorted = [...events].sort((a, b) => a.year - b.year);
    const step = Math.max(1, Math.floor(sorted.length / limit));
    const selected: OnThisDayEvent[] = [];

    for (let i = 0; i < sorted.length && selected.length < limit; i += step) {
      const event = sorted[i];
      selected.push({
        year: event.year,
        text: event.text,
        pages: (event.pages || [])
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

    return selected;
  } catch {
    return [];
  }
}
