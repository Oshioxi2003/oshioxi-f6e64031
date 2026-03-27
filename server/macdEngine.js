/**
 * MACD / FOMO Calculation Engine (Server-side port)
 * Same formulas as frontend src/lib/macdEngine.ts
 */

const DEFAULT_PARAMS = {
  nFast: 5,
  nSlow: 13,
  nSignal: 9,
  k: 0.005,
};

function computeAlpha(period) {
  return 2 / (period + 1);
}

function normalizeHistogram(delta) {
  if (delta === 0) return 0;
  return delta / Math.sqrt(delta * delta + 1);
}

function getTrendFromMACD(macd) {
  if (macd > 0.01) return 'Tích cực';
  if (macd < -0.01) return 'Tiêu cực';
  return 'Trung lập';
}

function getSignal(currentMacd, currentSignal, prevMacd, prevSignal) {
  const currentDiff = currentMacd - currentSignal;
  const prevDiff = prevMacd - prevSignal;
  if (prevDiff <= 0 && currentDiff > 0) return 'BUY';
  if (prevDiff >= 0 && currentDiff < 0) return 'SELL';
  return 'NONE';
}

/**
 * Process candles through MACD → FOMO → M → N pipeline.
 * Candles must be sorted chronologically (oldest first).
 */
function processCandles(candles, params = DEFAULT_PARAMS) {
  if (candles.length === 0) return [];

  const αFast = computeAlpha(params.nFast);
  const αSlow = computeAlpha(params.nSlow);
  const αSignal = computeAlpha(params.nSignal);
  const k = params.k;

  const rows = [];

  let emaFast = candles[0].close;
  let emaSlow = candles[0].close;
  let signalLine = 0;
  let fomoSmoothed = 0;
  let m = 0;
  let n = 0;

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i];
    const P = candle.close;

    emaFast = emaFast + αFast * (P - emaFast);
    emaSlow = emaSlow + αSlow * (P - emaSlow);

    const macdVal = emaFast - emaSlow;
    signalLine = signalLine + αSignal * (macdVal - signalLine);
    const histogram = macdVal - signalLine;

    const compression = normalizeHistogram(histogram);

    fomoSmoothed = fomoSmoothed * (1 - k) + k * compression;

    m = m + fomoSmoothed;
    n = n + αSignal * (m - n);

    const trend = getTrendFromMACD(macdVal);

    const tradeSignal = i === 0
      ? 'NONE'
      : getSignal(macdVal, signalLine, rows[i - 1].macd, rows[i - 1].signalLine);

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
      tradeSignal,
    });
  }

  return rows;
}

module.exports = { processCandles, DEFAULT_PARAMS };
