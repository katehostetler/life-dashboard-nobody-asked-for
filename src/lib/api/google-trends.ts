import type { TrendingSearch } from "@/lib/types";

export async function fetchGoogleTrends(
  limit: number = 10
): Promise<TrendingSearch[]> {
  try {
    const res = await fetch(
      "https://trends.google.com/trending/rss?geo=US",
      { next: { revalidate: 1800 } } // 30 minutes
    );

    if (!res.ok) return [];

    const xml = await res.text();

    // Parse RSS items from XML
    const items: TrendingSearch[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
      const itemXml = match[1];

      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        ?? itemXml.match(/<title>(.*?)<\/title>/)?.[1]
        ?? "";

      const traffic = itemXml.match(
        /<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/
      )?.[1] ?? "";

      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1]
        ?? itemXml.match(/<link\/>(.*?)$/m)?.[1]
        ?? "";

      if (title) {
        // The RSS <link> points to the feed itself, not a search page.
        // Build a Google search URL from the title instead.
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
        items.push({ title, traffic, url: searchUrl });
      }
    }

    return items;
  } catch {
    return [];
  }
}
