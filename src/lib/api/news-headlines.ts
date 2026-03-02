import type { NewsHeadline } from "@/lib/types";

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY || "";

export async function fetchTopHeadlines(
  limit: number = 5
): Promise<NewsHeadline[]> {
  if (!GUARDIAN_API_KEY) return [];

  try {
    const res = await fetch(
      `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&page-size=${limit}&order-by=newest&show-fields=headline`,
      { next: { revalidate: 1800 } } // 30 minutes
    );

    if (!res.ok) return [];

    const data = await res.json();
    const results = data?.response?.results;
    if (!Array.isArray(results)) return [];

    return results.map(
      (item: {
        webTitle: string;
        webUrl: string;
        sectionName: string;
        webPublicationDate: string;
      }) => ({
        title: item.webTitle,
        url: item.webUrl,
        source: item.sectionName || "The Guardian",
        publishedAt: item.webPublicationDate,
      })
    );
  } catch {
    return [];
  }
}
