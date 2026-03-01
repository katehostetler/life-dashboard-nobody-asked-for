import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const res = await fetch("http://api.open-notify.org/astros.json", {
      next: { revalidate: 300 }, // cache 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { number: 0, people: [] },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { number: 0, people: [] },
      { status: 200 }
    );
  }
}
