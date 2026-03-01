import type { NasaEpicImage } from "@/lib/types";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function fetchLatestEarthImage(): Promise<{
  imageUrl: string;
  caption: string;
  date: string;
} | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`,
      { next: { revalidate: 21600 } } // 6 hours
    );

    if (!res.ok) return null;

    const images: NasaEpicImage[] = await res.json();
    if (!images.length) return null;

    const latest = images[0];
    const dateStr = latest.date.split(" ")[0]; // "2024-01-15"
    const [year, month, day] = dateStr.split("-");

    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${latest.image}.png`;

    return {
      imageUrl,
      caption: latest.caption,
      date: latest.date,
    };
  } catch {
    return null;
  }
}
