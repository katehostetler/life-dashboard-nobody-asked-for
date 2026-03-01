import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const res = await fetch("http://ip-api.com/json/?fields=lat,lon,city,country", {
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { lat: 40.7128, lon: -74.006 },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { lat: 40.7128, lon: -74.006 },
      { status: 200 }
    );
  }
}
