import { useState, useMemo, useCallback } from "react";

interface UseChartZoomOptions {
  /** Total number of data points */
  totalPoints: number;
  /** Minimum visible window (can't zoom in beyond this) */
  minWindow?: number;
  /** Zoom step — how many points to add/remove per click */
  zoomStep?: number;
}

interface UseChartZoomReturn<T> {
  /** The sliced data to render */
  visibleData: T[];
  /** Current zoom level description */
  zoomPercent: number;
  /** Whether we're at full zoom (can't zoom out more) */
  isFullView: boolean;
  /** Whether we're at max zoom (can't zoom in more) */
  isMaxZoom: boolean;
  /** Zoom in — show fewer, more recent points */
  zoomIn: () => void;
  /** Zoom out — show more points */
  zoomOut: () => void;
  /** Reset to full view */
  reset: () => void;
}

/**
 * Data-window zoom hook for Recharts.
 * Controls a visible window that always shows the most recent data points.
 * Zoom in → fewer points (more detail) · Zoom out → more points (wider view)
 */
export function useChartZoom<T>(
  data: T[],
  options: UseChartZoomOptions,
): UseChartZoomReturn<T> {
  const { totalPoints, minWindow = 10, zoomStep } = options;
  const step = zoomStep ?? Math.max(Math.floor(totalPoints * 0.15), 5);

  // windowSize = how many points are visible (starts at full)
  const [windowSize, setWindowSize] = useState(totalPoints);

  // Clamp window size between minWindow and totalPoints
  const clampedWindow = Math.max(minWindow, Math.min(windowSize, totalPoints));

  const visibleData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (clampedWindow >= data.length) return data;
    // Always show the most recent `clampedWindow` points
    return data.slice(data.length - clampedWindow);
  }, [data, clampedWindow]);

  const zoomIn = useCallback(() => {
    setWindowSize((prev) => Math.max(minWindow, prev - step));
  }, [minWindow, step]);

  const zoomOut = useCallback(() => {
    setWindowSize((prev) => Math.min(totalPoints, prev + step));
  }, [totalPoints, step]);

  const reset = useCallback(() => {
    setWindowSize(totalPoints);
  }, [totalPoints]);

  const zoomPercent = Math.round((clampedWindow / totalPoints) * 100);

  return {
    visibleData,
    zoomPercent,
    isFullView: clampedWindow >= totalPoints,
    isMaxZoom: clampedWindow <= minWindow,
    zoomIn,
    zoomOut,
    reset,
  };
}
