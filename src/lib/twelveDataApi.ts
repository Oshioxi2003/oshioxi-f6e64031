/**
 * Twelve Data API service
 * Fetches XAU/USD time series data
 */

import type { Candle } from "./macdEngine";

const BASE_URL = "https://api.twelvedata.com";
const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY as string;

export type Interval =
  | "1min"
  | "5min"
  | "15min"
  | "30min"
  | "45min"
  | "1h"
  | "2h"
  | "4h"
  | "1day"
  | "1week"
  | "1month";

export interface FetchTimeSeriesParams {
  symbol?: string;
  interval?: Interval;
  outputsize?: number;
  startDate?: string;
  endDate?: string;
  timezone?: string;
}

interface TwelveDataValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

interface TwelveDataResponse {
  meta?: { symbol: string; interval: string };
  values?: TwelveDataValue[];
  status?: string;
  message?: string;
  code?: number;
}

/**
 * Fetch time series candles from Twelve Data API.
 * Returns candles sorted chronologically (oldest → newest).
 */
export async function fetchTimeSeries(
  params: FetchTimeSeriesParams = {},
): Promise<Candle[]> {
  const {
    symbol = "XAU/USD",
    interval = "5min",
    outputsize = 200,
    startDate,
    endDate,
    timezone = "Asia/Ho_Chi_Minh",
  } = params;

  const url = new URL(`${BASE_URL}/time_series`);
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("outputsize", String(outputsize));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("apikey", API_KEY);

  if (startDate) url.searchParams.set("start_date", startDate);
  if (endDate) url.searchParams.set("end_date", endDate);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.status} ${response.statusText}`);
  }

  const data: TwelveDataResponse = await response.json();

  // API-level errors (rate limit, bad key, etc.)
  if (data.code && data.code >= 400) {
    throw new Error(`Twelve Data: ${data.message || "Unknown API error"} (code ${data.code})`);
  }

  if (!data.values || data.values.length === 0) {
    throw new Error("Twelve Data: No data returned");
  }

  // Twelve Data returns newest first — reverse to get chronological order
  const candles: Candle[] = data.values
    .map((v) => ({
      time: v.datetime,
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
    }))
    .reverse();

  return candles;
}

/**
 * Fetch the latest price only (single data point).
 */
export async function fetchLatestPrice(
  symbol = "XAU/USD",
): Promise<{ price: number; time: string }> {
  const url = new URL(`${BASE_URL}/price`);
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("apikey", API_KEY);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Twelve Data price error: ${response.status}`);
  }

  const data = await response.json();
  return {
    price: parseFloat(data.price),
    time: new Date().toISOString(),
  };
}
