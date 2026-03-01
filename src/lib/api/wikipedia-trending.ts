import type { WikiArticle } from "@/lib/types";

// Internal/meta pages to filter out
const EXCLUDED_ARTICLES = new Set([
  "Main_Page",
  "Special:Search",
  "Wikipedia:Featured_pictures",
  "-",
  "undefined",
]);

function isExcluded(title: string): boolean {
  if (EXCLUDED_ARTICLES.has(title)) return true;
  if (title.startsWith("Special:")) return true;
  if (title.startsWith("Wikipedia:")) return true;
  if (title.startsWith("Portal:")) return true;
  if (title.startsWith("File:")) return true;
  if (title.startsWith("Help:")) return true;
  if (title.startsWith("Template:")) return true;
  if (title.startsWith("Category:")) return true;
  return false;
}

export async function fetchTopWikipediaArticles(count: number = 5): Promise<WikiArticle[]> {
  try {
    // Always fetch yesterday's data (today's isn't available yet)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");

    const res = await fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`,
      {
        headers: {
          "User-Agent": "LifeDashboard/1.0 (educational project)",
        },
        next: { revalidate: 3600 }, // 1 hour
      }
    );

    if (!res.ok) return getFallbackArticles();

    const data = await res.json();
    const articles = data.items?.[0]?.articles ?? [];

    const filtered: WikiArticle[] = [];
    let rank = 1;

    for (const article of articles) {
      if (filtered.length >= count) break;
      if (isExcluded(article.article)) continue;

      filtered.push({
        article: article.article.replace(/_/g, " "),
        views: article.views,
        rank: rank++,
      });
    }

    return filtered.length > 0 ? filtered : getFallbackArticles();
  } catch {
    return getFallbackArticles();
  }
}

function getFallbackArticles(): WikiArticle[] {
  return [
    { article: "United States", views: 0, rank: 1 },
    { article: "YouTube", views: 0, rank: 2 },
    { article: "Elizabeth II", views: 0, rank: 3 },
    { article: "India", views: 0, rank: 4 },
    { article: "Deaths in 2026", views: 0, rank: 5 },
  ];
}
