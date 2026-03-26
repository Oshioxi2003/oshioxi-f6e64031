import { useRef, useMemo, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Loader2 } from "lucide-react";
import type { FomoDataRow } from "@/hooks/useFomoData";

// Register Chart.js components + zoom plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

interface FOMOChartProps {
  data?: FomoDataRow[];
  isLoading?: boolean;
}

const FOMOChart = ({ data, isLoading }: FOMOChartProps) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  // Aggregate by price level
  const { labels, positiveValues, negativeValues } = useMemo(() => {
    if (!data || data.length === 0)
      return { labels: [] as string[], positiveValues: [] as number[], negativeValues: [] as number[] };

    const priceMap = new Map<number, { positive: number; negative: number }>();

    for (const row of data) {
      const priceLevel = Math.round(row.price);
      const existing = priceMap.get(priceLevel) || { positive: 0, negative: 0 };

      if (row.compression >= 0) {
        existing.positive += Math.abs(row.compression);
      } else {
        existing.negative += Math.abs(row.compression);
      }

      priceMap.set(priceLevel, existing);
    }

    const sorted = Array.from(priceMap.entries()).sort((a, b) => a[0] - b[0]);

    return {
      labels: sorted.map(([price]) => String(price)),
      positiveValues: sorted.map(([, v]) => +v.positive.toFixed(4)),
      negativeValues: sorted.map(([, v]) => +v.negative.toFixed(4)),
    };
  }, [data]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Tích cực",
          data: positiveValues,
          backgroundColor: "rgba(56, 132, 244, 0.85)",
          borderColor: "rgba(56, 132, 244, 1)",
          borderWidth: 0.5,
          barPercentage: 0.85,
          categoryPercentage: 0.9,
        },
        {
          label: "Tiêu cực",
          data: negativeValues,
          backgroundColor: "rgba(234, 57, 67, 0.85)",
          borderColor: "rgba(234, 57, 67, 1)",
          borderWidth: 0.5,
          barPercentage: 0.85,
          categoryPercentage: 0.9,
        },
      ],
    }),
    [labels, positiveValues, negativeValues],
  );

  const options = useMemo(
    () => ({
      indexAxis: "y" as const,
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 300 },
      layout: { padding: { top: 5, bottom: 5, left: 0, right: 10 } },
      scales: {
        x: {
          stacked: false,
          title: {
            display: true,
            text: "|FOMO| (Absolute Value)",
            color: "hsl(220, 10%, 50%)",
            font: { size: 11, family: "'JetBrains Mono', monospace" },
          },
          ticks: {
            color: "hsl(220, 10%, 40%)",
            font: { size: 10, family: "'JetBrains Mono', monospace" },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.04)",
            drawTicks: false,
          },
          border: { display: false },
        },
        y: {
          stacked: false,
          title: {
            display: true,
            text: "Price",
            color: "hsl(220, 10%, 50%)",
            font: { size: 11, family: "'JetBrains Mono', monospace" },
          },
          ticks: {
            color: "hsl(220, 10%, 45%)",
            font: { size: 10, family: "'JetBrains Mono', monospace" },
            autoSkip: false,
          },
          grid: {
            display: false,
          },
          border: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "hsl(225, 22%, 10%)",
          titleColor: "hsl(210, 20%, 95%)",
          bodyColor: "hsl(210, 20%, 85%)",
          borderColor: "hsl(225, 16%, 20%)",
          borderWidth: 1,
          cornerRadius: 10,
          titleFont: { family: "'JetBrains Mono', monospace", size: 11 },
          bodyFont: { family: "'JetBrains Mono', monospace", size: 10 },
          padding: 10,
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          boxPadding: 4,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "y" as const,
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            drag: {
              enabled: false,
            },
            mode: "y" as const,
          },
        },
      },
    }),
    [],
  );

  const handleZoomIn = useCallback(() => {
    chartRef.current?.zoom(1.3);
  }, []);

  const handleZoomOut = useCallback(() => {
    chartRef.current?.zoom(0.7);
  }, []);

  const handleReset = useCallback(() => {
    chartRef.current?.resetZoom();
  }, []);

  return (
    <div className="finshark-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Phân phối FOMO</h3>
            <p className="text-[10px] text-muted-foreground">Giá trị theo mức giá · Live</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Legend */}
          <div className="flex items-center gap-3 mr-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(56, 132, 244, 0.85)" }} />
              <span className="text-[10px] text-muted-foreground font-medium">Tích cực</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(234, 57, 67, 0.85)" }} />
              <span className="text-[10px] text-muted-foreground font-medium">Tiêu cực</span>
            </div>
          </div>

          {/* Zoom buttons */}
          <div className="flex gap-1.5">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary/80 hover:text-foreground border border-border/30 rounded-lg transition-all duration-200"
            >
              Đặt lại Zoom
            </button>
            <button
              onClick={handleZoomIn}
              className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary/80 hover:text-foreground border border-border/30 rounded-lg transition-all duration-200"
            >
              Phóng to
            </button>
            <button
              onClick={handleZoomOut}
              className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary/80 hover:text-foreground border border-border/30 rounded-lg transition-all duration-200"
            >
              Thu nhỏ
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[500px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : labels.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
            Không có dữ liệu
          </div>
        ) : (
          <Bar ref={chartRef} data={chartData} options={options} />
        )}
      </div>

      {/* Footer hint */}
      <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
        Cuộn để zoom · Kéo để di chuyển · Nhấp đúp để đặt lại
      </p>
    </div>
  );
};

export default FOMOChart;
