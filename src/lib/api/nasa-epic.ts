import type { NasaEpicImage } from "@/lib/types";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

function getFallbackEarthImage() {
  return {
    imageUrl: "/earth-fallback.png",
    caption: "Earth, as seen from the DSCOVR spacecraft (NASA/EPIC)",
    date: "2026-02-25 00:17:51",
  };
}

export async function fetchLatestEarthImage(): Promise<{
  imageUrl: string;
  caption: string;
  date: string;
}> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`,
      { next: { revalidate: 43200 } } // 12 hours
    );

    if (!res.ok) return getFallbackEarthImage();

    const images: NasaEpicImage[] = await res.json();
    if (!images.length) return getFallbackEarthImage();

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
    return getFallbackEarthImage();
  }
}
