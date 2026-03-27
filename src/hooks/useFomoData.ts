/**
 * React Query hook — fetches XAU/USD data from backend API
 * Backend handles: Twelve Data fetch → MACD processing → MySQL storage
 */

import { useQuery } from "@tanstack/react-query";
import type { Interval } from "@/lib/twelveDataApi";
import type { ComputedRow } from "@/lib/macdEngine";

const API_URL = import.meta.env.VITE_API_URL || '';

export interface FomoDataRow extends ComputedRow {
  tradeSignal: "BUY" | "SELL" | "NONE";
}

export interface UseFomoDataOptions {
  interval?: Interval;
  outputsize?: number;
  refetchInterval?: number | false;
  enabled?: boolean;
}

async function fetchFromBackend(interval: string, outputsize: number): Promise<FomoDataRow[]> {
  const token = localStorage.getItem('finshark_token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  // Call backend to fetch fresh data from Twelve Data + store in MySQL
  const fetchRes = await fetch(`${API_URL}/api/data/fetch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ interval, outputsize }),
  });

  if (!fetchRes.ok) {
    // If fetch fails, try to get stored data instead
    console.warn('Fresh fetch failed, trying stored data...');
    const historyRes = await fetch(
      `${API_URL}/api/data/history?interval=${interval}&limit=${outputsize}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
    if (!historyRes.ok) {
      throw new Error('Cannot fetch data from server');
    }
    const historyData = await historyRes.json();
    return historyData.data as FomoDataRow[];
  }

  const data = await fetchRes.json();
  return data.data as FomoDataRow[];
}

export function useFomoData(options: UseFomoDataOptions = {}) {
  const {
    interval = "5min",
    outputsize = 200,
    refetchInterval = 60_000,
    enabled = true,
  } = options;

  return useQuery({
    queryKey: ["fomo-data", interval, outputsize],
    queryFn: async (): Promise<FomoDataRow[]> => {
      return fetchFromBackend(interval, outputsize);
    },
    refetchInterval,
    enabled,
    staleTime: 30_000,
    retry: 2,
  });
}
