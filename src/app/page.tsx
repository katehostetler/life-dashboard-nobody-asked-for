import { fetchLatestEarthImage } from "@/lib/api/nasa-epic";
import { fetchTopWikipediaArticles } from "@/lib/api/wikipedia-trending";
import { fetchFlightCount } from "@/lib/api/opensky";
import { fetchGoogleTrends } from "@/lib/api/google-trends";
import { fetchTopHeadlines } from "@/lib/api/news-headlines";
import { fetchAPOD } from "@/lib/api/nasa-apod";
import { fetchOnThisDay } from "@/lib/api/on-this-day";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  // Fetch server-side data in parallel
  const [earthImage, wikiArticles, flightCount, trends, headlines, apod, onThisDay] =
    await Promise.all([
      fetchLatestEarthImage(),
      fetchTopWikipediaArticles(5),
      fetchFlightCount(),
      fetchGoogleTrends(10),
      fetchTopHeadlines(5),
      fetchAPOD(),
      fetchOnThisDay(3),
    ]);

  return (
    <Dashboard
      earthImage={earthImage}
      wikiArticles={wikiArticles}
      flightCount={flightCount}
      trends={trends}
      headlines={headlines}
      apod={apod}
      onThisDay={onThisDay}
    />
  );
}
