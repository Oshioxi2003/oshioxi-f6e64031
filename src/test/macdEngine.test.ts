import { describe, it, expect } from "vitest";
import { computeAlpha, processCandles, normalizeHistogram, getSignal, getTrendFromMACD, type Candle } from "@/lib/macdEngine";

describe("macdEngine", () => {
  describe("computeAlpha", () => {
    it("should compute α = 2 / (period + 1)", () => {
      expect(computeAlpha(5)).toBeCloseTo(2 / 6, 10);       // 0.3333...
      expect(computeAlpha(13)).toBeCloseTo(2 / 14, 10);      // 0.1428...
      expect(computeAlpha(9)).toBeCloseTo(2 / 10, 10);       // 0.2
      expect(computeAlpha(1)).toBeCloseTo(1, 10);             // 2/2 = 1
      expect(computeAlpha(26)).toBeCloseTo(2 / 27, 10);      // ~0.074
    });
  });

  describe("normalizeHistogram", () => {
    it("should return 0 for delta = 0", () => {
      expect(normalizeHistogram(0)).toBe(0);
    });

    it("should return values in [-1, 1]", () => {
      expect(normalizeHistogram(1)).toBeCloseTo(1 / Math.sqrt(2), 6);
      expect(normalizeHistogram(-1)).toBeCloseTo(-1 / Math.sqrt(2), 6);
      expect(normalizeHistogram(100)).toBeGreaterThan(0.99);
      expect(normalizeHistogram(-100)).toBeLessThan(-0.99);
    });

    it("should preserve sign", () => {
      expect(normalizeHistogram(5)).toBeGreaterThan(0);
      expect(normalizeHistogram(-5)).toBeLessThan(0);
    });

    it("should produce ~0.8944 for delta = 2", () => {
      // Δ/√(Δ²+1) = 2/√5 ≈ 0.8944
      expect(normalizeHistogram(2)).toBeCloseTo(2 / Math.sqrt(5), 4);
    });
  });

  describe("processCandles", () => {
    const makeCandle = (close: number, time = "2026-01-01 00:00"): Candle => ({
      time,
      open: close,
      high: close + 1,
      low: close - 1,
      close,
    });

    it("should return empty array for empty input", () => {
      expect(processCandles([])).toEqual([]);
    });

    it("should initialize correctly with first candle", () => {
      const rows = processCandles([makeCandle(100)]);
      const first = rows[0];

      // EMA_fast = EMA_slow = first close price
      expect(first.emaFast).toBeCloseTo(100, 4);
      expect(first.emaSlow).toBeCloseTo(100, 4);

      // MACD = EMA_fast - EMA_slow = 0 for first candle
      expect(first.macd).toBeCloseTo(0, 4);

      // Signal starts at 0, so after update: 0 + α_signal * (MACD - 0) ≈ 0
      expect(first.signalLine).toBeCloseTo(0, 2);

      // Histogram = MACD - Signal ≈ 0
      expect(first.histogram).toBeCloseTo(0, 2);

      // Compression of 0 histogram = 0
      expect(first.compression).toBeCloseTo(0, 4);

      // FOMO starts at 0, M starts at 0
      expect(first.fomoSmoothed).toBeCloseTo(0, 4);
      expect(first.m).toBeCloseTo(0, 4);

      // Trend should be Trung lập when MACD ≈ 0
      expect(first.trend).toBe("Trung lập");
    });

    it("should compute multiple candles and maintain running state", () => {
      const candles: Candle[] = [
        makeCandle(100, "2026-01-01 00:00"),
        makeCandle(102, "2026-01-01 00:05"),
        makeCandle(101, "2026-01-01 00:10"),
        makeCandle(105, "2026-01-01 00:15"),
        makeCandle(103, "2026-01-01 00:20"),
      ];

      const rows = processCandles(candles);

      // Should have same length as input
      expect(rows).toHaveLength(5);

      // Each row should have all fields
      for (const row of rows) {
        expect(row).toHaveProperty("emaFast");
        expect(row).toHaveProperty("emaSlow");
        expect(row).toHaveProperty("macd");
        expect(row).toHaveProperty("signalLine");
        expect(row).toHaveProperty("histogram");
        expect(row).toHaveProperty("compression");
        expect(row).toHaveProperty("fomoSmoothed");
        expect(row).toHaveProperty("m");
        expect(row).toHaveProperty("n");
        expect(row).toHaveProperty("trend");
      }

      // Verify EMA_fast moves faster than EMA_slow
      // After price increase to 102:
      expect(rows[1].emaFast).toBeGreaterThan(rows[1].emaSlow);

      // M should be cumulative — each value adds previous FOMO
      const mValues = rows.map((r) => r.m);
      const allSame = mValues.every((v) => v === mValues[0]);
      expect(allSame).toBe(false);
    });

    it("should normalize compression to [-1, 1] range", () => {
      const candles: Candle[] = [];
      for (let i = 0; i < 20; i++) {
        candles.push(makeCandle(100 + Math.sin(i) * 10, `2026-01-01 ${String(i).padStart(2, "0")}:00`));
      }

      const rows = processCandles(candles);

      for (const row of rows) {
        expect(row.compression).toBeGreaterThanOrEqual(-1);
        expect(row.compression).toBeLessThanOrEqual(1);
      }
    });

    it("should set trend based on MACD direction", () => {
      // Rapidly rising prices → MACD positive → Tích cực
      const candles: Candle[] = [
        makeCandle(100, "2026-01-01 00:00"),
        makeCandle(110, "2026-01-01 00:05"),
        makeCandle(120, "2026-01-01 00:10"),
        makeCandle(130, "2026-01-01 00:15"),
        makeCandle(140, "2026-01-01 00:20"),
      ];

      const rows = processCandles(candles);
      // After several rising candles, MACD should be positive
      expect(rows[4].trend).toBe("Tích cực");
    });
  });

  describe("getTrendFromMACD", () => {
    it("should return Tích cực for positive MACD", () => {
      expect(getTrendFromMACD(0.1)).toBe("Tích cực");
      expect(getTrendFromMACD(5)).toBe("Tích cực");
    });

    it("should return Tiêu cực for negative MACD", () => {
      expect(getTrendFromMACD(-0.1)).toBe("Tiêu cực");
      expect(getTrendFromMACD(-5)).toBe("Tiêu cực");
    });

    it("should return Trung lập for near-zero MACD", () => {
      expect(getTrendFromMACD(0)).toBe("Trung lập");
      expect(getTrendFromMACD(0.005)).toBe("Trung lập");
      expect(getTrendFromMACD(-0.005)).toBe("Trung lập");
    });
  });

  describe("getSignal", () => {
    it("should return BUY on upward crossover", () => {
      // prev: MACD below Signal → current: MACD above Signal
      expect(getSignal(1, 0.5, -1, 0.5)).toBe("BUY");
    });

    it("should return SELL on downward crossover", () => {
      // prev: MACD above Signal → current: MACD below Signal
      expect(getSignal(-1, 0.5, 1, 0.5)).toBe("SELL");
    });

    it("should return NONE when no crossover", () => {
      // Both above
      expect(getSignal(2, 1, 1, 0)).toBe("NONE");
      // Both below
      expect(getSignal(-2, -1, -3, -2)).toBe("NONE");
    });
  });
});
