import { NextResponse } from "next/server";
import type { MarketPrice } from "@/lib/types";

export const runtime = "edge";

async function fetchCryptoPrices(): Promise<MarketPrice[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true",
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    const prices: MarketPrice[] = [];

    if (data.bitcoin) {
      prices.push({
        symbol: "BTC",
        name: "Bitcoin",
        price: data.bitcoin.usd ?? 0,
        change24h: data.bitcoin.usd_24h_change ?? 0,
        currency: "USD",
      });
    }

    if (data.solana) {
      prices.push({
        symbol: "SOL",
        name: "Solana",
        price: data.solana.usd ?? 0,
        change24h: data.solana.usd_24h_change ?? 0,
        currency: "USD",
      });
    }

    return prices;
  } catch {
    return [];
  }
}

async function fetchGoldPrice(): Promise<MarketPrice | null> {
  const apiKey = process.env.METALS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${apiKey}&currency=USD&unit=toz`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();

    const goldPrice = data?.metals?.gold;
    if (!goldPrice) return null;

    return {
      symbol: "XAU",
      name: "Gold",
      price: goldPrice,
      change24h: 0, // Metals.dev free tier doesn't include change
      currency: "USD",
    };
  } catch {
    return null;
  }
}

async function fetchOilPrice(): Promise<MarketPrice | null> {
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();

    const latest = data?.data?.[0];
    const previous = data?.data?.[1];
    if (!latest?.value) return null;

    const price = parseFloat(latest.value);
    const prevPrice = previous?.value ? parseFloat(previous.value) : price;
    const change = prevPrice > 0 ? ((price - prevPrice) / prevPrice) * 100 : 0;

    return {
      symbol: "WTI",
      name: "Oil (WTI)",
      price,
      change24h: change,
      currency: "USD",
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [crypto, gold, oil] = await Promise.all([
    fetchCryptoPrices(),
    fetchGoldPrice(),
    fetchOilPrice(),
  ]);

  const prices: MarketPrice[] = [...crypto];
  if (gold) prices.push(gold);
  if (oil) prices.push(oil);

  return NextResponse.json(prices);
}
