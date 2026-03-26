/**
 * MACD / FOMO Calculation Engine
 * Implements the formulas from docs/Công thức MACD và Chuẩn hóa.md
 *
 * Key design decisions based on expected output analysis:
 * - Normalization uses per-tick scaling (Δ / sqrt(Δ²+1)) not min-max lookahead
 * - "FOMO" displayed value = Compression (C) — the raw normalized histogram
 * - Smoothed FOMO (internal) uses k=0.005 for M/N accumulation
 * - Trend is based on MACD direction (EMA_fast vs EMA_slow)
 */

// ── Types ──────────────────────────────────────────────────────────────

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface MACDParams {
  nFast: number;   // default 5
  nSlow: number;   // default 13
  nSignal: number; // default 9
  k: number;       // FOMO smoothing, default 0.005
}

export interface ComputedRow {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  emaFast: number;
  emaSlow: number;
  macd: number;
  signalLine: number;
  histogram: number;
  compression: number;  // Normalized Δ — this is the "FOMO" displayed to the user
  fomoSmoothed: number; // Internal smoothed FOMO (for M/N accumulation)
  m: number;
  n: number;
  trend: string;        // Tích cực / Tiêu cực / Trung lập
}

export const DEFAULT_PARAMS: MACDParams = {
  nFast: 5,
  nSlow: 13,
  nSignal: 9,
  k: 0.005,
};

// ── Core Functions ─────────────────────────────────────────────────────

/**
 * Smoothing factor: α = 2 / (period + 1)
 */
export function computeAlpha(period: number): number {
  return 2 / (period + 1);
}

/**
 * Normalize histogram value using sigmoid-like scaling.
 * Maps Δ to [-1, 1] range without needing min/max lookahead.
 * Formula: C = Δ / sqrt(Δ² + 1)
 * This preserves sign and works in real-time (no future data needed).
 */
export function normalizeHistogram(delta: number): number {
  if (delta === 0) return 0;
  return delta / Math.sqrt(delta * delta + 1);
}

/**
 * Process an array of candles through the full MACD → FOMO → M → N pipeline.
 *
 * Candles MUST be sorted chronologically (oldest first).
 *
 * Initialization (first candle / start of session):
 *   EMA_fast = EMA_slow = close price
 *   Signal = 0, FOMO = 0, M = 0
 */
export function processCandles(
  candles: Candle[],
  params: MACDParams = DEFAULT_PARAMS,
): ComputedRow[] {
  if (candles.length === 0) return [];

  const αFast = computeAlpha(params.nFast);
  const αSlow = computeAlpha(params.nSlow);
  const αSignal = computeAlpha(params.nSignal);
  const k = params.k;

  const rows: ComputedRow[] = [];

  // State variables — initialized per doc "TỔNG KẾT KHỞI TẠO"
  let emaFast = candles[0].close;
  let emaSlow = candles[0].close;
  let signalLine = 0;
  let fomoSmoothed = 0;
  let m = 0;
  let n = 0;

  for (const candle of candles) {
    const P = candle.close;

    // Step 2: EMA update
    emaFast = emaFast + αFast * (P - emaFast);
    emaSlow = emaSlow + αSlow * (P - emaSlow);

    // Step 3: MACD, Signal, Histogram
    const macdVal = emaFast - emaSlow;
    signalLine = signalLine + αSignal * (macdVal - signalLine);
    const histogram = macdVal - signalLine;

    // Step 4: Compression (Normalized Δ) — streaming, no lookahead
    const compression = normalizeHistogram(histogram);

    // Step 5: Smoothed FOMO (internal, for M/N)
    fomoSmoothed = fomoSmoothed * (1 - k) + k * compression;

    // Step 6: M — cumulative sum
    m = m + fomoSmoothed;

    // Step 7: N — EMA of M
    n = n + αSignal * (m - n);

    // Trend based on MACD direction (EMA_fast vs EMA_slow)
    const trend = getTrendFromMACD(macdVal);

    rows.push({
      time: candle.time,
      price: P,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      emaFast,
      emaSlow,
      macd: macdVal,
      signalLine,
      histogram,
      compression,
      fomoSmoothed,
      m,
      n,
      trend,
    });
  }

  return rows;
}

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Determine trend from MACD value (= EMA_fast - EMA_slow).
 * MACD > 0 → price is trending up (Tích cực)
 * MACD < 0 → price is trending down (Tiêu cực)
 * MACD ≈ 0 → neutral (Trung lập)
 */
export function getTrendFromMACD(macd: number): string {
  if (macd > 0.01) return "Tích cực";
  if (macd < -0.01) return "Tiêu cực";
  return "Trung lập";
}

/** Get the signal from MACD / Signal crossover */
export function getSignal(
  currentMacd: number,
  currentSignal: number,
  prevMacd: number,
  prevSignal: number,
): "BUY" | "SELL" | "NONE" {
  const currentDiff = currentMacd - currentSignal;
  const prevDiff = prevMacd - prevSignal;

  // Cross from below to above → BUY
  if (prevDiff <= 0 && currentDiff > 0) return "BUY";
  // Cross from above to below → SELL
  if (prevDiff >= 0 && currentDiff < 0) return "SELL";
  return "NONE";
}
