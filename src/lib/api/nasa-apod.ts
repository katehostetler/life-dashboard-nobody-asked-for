import type { NasaApod } from "@/lib/types";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function fetchAPOD(): Promise<NasaApod | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
      { next: { revalidate: 43200 } } // 12 hours
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl,
      media_type: data.media_type,
      date: data.date,
    };
  } catch {
    return null;
  }
}
