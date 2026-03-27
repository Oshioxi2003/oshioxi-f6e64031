/**
 * Twelve Data API service (server-side)
 * Fetches XAU/USD time series data and stores in MySQL
 */
const pool = require('./db');
const { processCandles } = require('./macdEngine');

const BASE_URL = 'https://api.twelvedata.com';

/**
 * Fetch candles from Twelve Data API
 */
async function fetchFromTwelveData(apiKey, params = {}) {
  const {
    symbol = 'XAU/USD',
    interval = '5min',
    outputsize = 200,
    timezone = 'Asia/Ho_Chi_Minh',
  } = params;

  const url = new URL(`${BASE_URL}/time_series`);
  url.searchParams.set('symbol', symbol);
  url.searchParams.set('interval', interval);
  url.searchParams.set('outputsize', String(outputsize));
  url.searchParams.set('timezone', timezone);
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.code && data.code >= 400) {
    throw new Error(`Twelve Data: ${data.message || 'Unknown API error'} (code ${data.code})`);
  }

  if (!data.values || data.values.length === 0) {
    throw new Error('Twelve Data: No data returned');
  }

  // Twelve Data returns newest first — reverse for chronological order
  const candles = data.values
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
 * Save raw candles to MySQL (upsert — skip duplicates)
 */
async function saveCandles(candles, symbol = 'XAU/USD', interval = '5min') {
  if (candles.length === 0) return [];

  const values = candles.map((c) => [symbol, interval, c.time, c.open, c.high, c.low, c.close]);

  // INSERT IGNORE to skip duplicates (unique key on symbol+interval+time)
  const sql = `
    INSERT IGNORE INTO candles (symbol, \`interval\`, time, open, high, low, close)
    VALUES ?
  `;

  await pool.query(sql, [values]);

  // Fetch back all candle IDs for this batch (including pre-existing ones)
  const times = candles.map((c) => c.time);
  const [rows] = await pool.query(
    `SELECT id, time, open, high, low, close FROM candles
     WHERE symbol = ? AND \`interval\` = ? AND time IN (?)
     ORDER BY time ASC`,
    [symbol, interval, times]
  );

  return rows;
}

/**
 * Save computed MACD/FOMO data to MySQL
 */
async function saveComputedData(computedRows, candleRows, symbol = 'XAU/USD', interval = '5min') {
  if (computedRows.length === 0) return;

  // Map candle time -> candle id
  const timeToId = {};
  for (const row of candleRows) {
    // Normalize time format for matching
    const timeStr = formatDatetime(row.time);
    timeToId[timeStr] = row.id;
  }

  const values = [];
  for (const row of computedRows) {
    const timeStr = formatDatetime(row.time);
    const candleId = timeToId[timeStr];
    if (!candleId) continue;

    values.push([
      candleId, symbol, interval, timeStr,
      row.price, row.open, row.high, row.low,
      row.emaFast, row.emaSlow, row.macd, row.signalLine,
      row.histogram, row.compression, row.fomoSmoothed,
      row.m, row.n, row.trend, row.tradeSignal,
    ]);
  }

  if (values.length === 0) return;

  // Use INSERT ... ON DUPLICATE KEY UPDATE to upsert
  const sql = `
    INSERT INTO computed_data
      (candle_id, symbol, \`interval\`, time, price, open, high, low,
       ema_fast, ema_slow, macd, signal_line, histogram, compression,
       fomo_smoothed, m, n, trend, trade_signal)
    VALUES ?
    ON DUPLICATE KEY UPDATE
      price = VALUES(price),
      ema_fast = VALUES(ema_fast),
      ema_slow = VALUES(ema_slow),
      macd = VALUES(macd),
      signal_line = VALUES(signal_line),
      histogram = VALUES(histogram),
      compression = VALUES(compression),
      fomo_smoothed = VALUES(fomo_smoothed),
      m = VALUES(m),
      n = VALUES(n),
      trend = VALUES(trend),
      trade_signal = VALUES(trade_signal)
  `;

  await pool.query(sql, [values]);
}

/**
 * Format a Date or string to MySQL DATETIME format
 */
function formatDatetime(d) {
  if (d instanceof Date) {
    return d.toISOString().slice(0, 19).replace('T', ' ');
  }
  // If already a string like "2024-01-01 12:30:00", return as-is
  if (typeof d === 'string') {
    // Handle ISO format
    if (d.includes('T')) {
      return d.slice(0, 19).replace('T', ' ');
    }
    return d;
  }
  return String(d);
}

/**
 * Full pipeline: Fetch → Process → Save → Return
 */
async function fetchAndStore(apiKey, params = {}) {
  const { symbol = 'XAU/USD', interval = '5min', outputsize = 200 } = params;

  // 1. Fetch from Twelve Data
  const candles = await fetchFromTwelveData(apiKey, { symbol, interval, outputsize });

  // 2. Save raw candles
  const candleRows = await saveCandles(candles, symbol, interval);

  // 3. Process through MACD engine
  const computedRows = processCandles(candles);

  // 4. Save computed data
  await saveComputedData(computedRows, candleRows, symbol, interval);

  return computedRows;
}

/**
 * Get stored computed data from MySQL (no API call)
 */
async function getStoredData(symbol = 'XAU/USD', interval = '5min', limit = 200) {
  const [rows] = await pool.query(
    `SELECT time, price, open, high, low,
            ema_fast AS emaFast, ema_slow AS emaSlow,
            macd, signal_line AS signalLine, histogram,
            compression, fomo_smoothed AS fomoSmoothed,
            m, n, trend, trade_signal AS tradeSignal
     FROM computed_data
     WHERE symbol = ? AND \`interval\` = ?
     ORDER BY time DESC
     LIMIT ?`,
    [symbol, interval, limit]
  );

  // Reverse to chronological order & convert decimals to numbers
  return rows.reverse().map((r) => ({
    ...r,
    price: Number(r.price),
    open: Number(r.open),
    high: Number(r.high),
    low: Number(r.low),
    emaFast: Number(r.emaFast),
    emaSlow: Number(r.emaSlow),
    macd: Number(r.macd),
    signalLine: Number(r.signalLine),
    histogram: Number(r.histogram),
    compression: Number(r.compression),
    fomoSmoothed: Number(r.fomoSmoothed),
    m: Number(r.m),
    n: Number(r.n),
  }));
}

module.exports = { fetchAndStore, getStoredData, fetchFromTwelveData };
