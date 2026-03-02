"use client";

import useSWR from "swr";
import type { MarketPrice } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useMarketPrices() {
  const { data, error } = useSWR<MarketPrice[]>(
    "/api/market-prices",
    fetcher,
    {
      refreshInterval: 30000, // 30 seconds
      revalidateOnFocus: false,
    }
  );

  return {
    prices: data ?? [],
    isLoading: !data && !error,
    error,
  };
}
