import { fetchLatestEarthImage } from "@/lib/api/nasa-epic";
import { fetchTopWikipediaArticles } from "@/lib/api/wikipedia-trending";
import { fetchFlightCount } from "@/lib/api/opensky";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  // Fetch server-side data in parallel
  const [earthImage, wikiArticles, flightCount] = await Promise.all([
    fetchLatestEarthImage(),
    fetchTopWikipediaArticles(5),
    fetchFlightCount(),
  ]);

  return (
    <Dashboard
      earthImage={earthImage}
      wikiArticles={wikiArticles}
      flightCount={flightCount}
    />
  );
}
