/**
 * React Query hook — fetches XAU/USD candles from Twelve Data
 * and processes them through the MACD/FOMO engine.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchTimeSeries, type Interval } from "@/lib/twelveDataApi";
import {
  processCandles,
  getSignal,
  type ComputedRow,
  type MACDParams,
  DEFAULT_PARAMS,
} from "@/lib/macdEngine";

export interface FomoDataRow extends ComputedRow {
  tradeSignal: "BUY" | "SELL" | "NONE";
}

export interface UseFomoDataOptions {
  interval?: Interval;
  outputsize?: number;
  params?: MACDParams;
  refetchInterval?: number | false;
  enabled?: boolean;
}

export function useFomoData(options: UseFomoDataOptions = {}) {
  const {
    interval = "5min",
    outputsize = 200,
    params = DEFAULT_PARAMS,
    refetchInterval = 60_000,
    enabled = true,
  } = options;

  return useQuery({
    queryKey: ["fomo-data", interval, outputsize, params],
    queryFn: async (): Promise<FomoDataRow[]> => {
      const candles = await fetchTimeSeries({ interval, outputsize });
      const computed = processCandles(candles, params);

      // Enrich with trade signal (BUY/SELL crossover)
      return computed.map((row, i) => {
        const sig =
          i === 0
            ? ("NONE" as const)
            : getSignal(row.macd, row.signalLine, computed[i - 1].macd, computed[i - 1].signalLine);

        return {
          ...row,
          tradeSignal: sig,
        };
      });
    },
    refetchInterval,
    enabled,
    staleTime: 30_000,
    retry: 2,
  });
}
