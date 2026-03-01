export async function fetchFlightCount(): Promise<number> {
  try {
    const username = process.env.OPENSKY_USERNAME;
    const password = process.env.OPENSKY_PASSWORD;

    const headers: HeadersInit = {};
    if (username && password) {
      headers["Authorization"] = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
    }

    const res = await fetch("https://opensky-network.org/api/states/all", {
      headers,
      next: { revalidate: 900 }, // 15 minutes
    });

    if (!res.ok) return 10000; // fallback estimate

    const data = await res.json();
    return data.states?.length ?? 10000;
  } catch {
    return 10000; // fallback estimate
  }
}
