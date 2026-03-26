import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import type { FomoDataRow } from "@/hooks/useFomoData";
import { useChartZoom } from "@/hooks/useChartZoom";
import { useMemo } from "react";

interface MNChartsProps {
  data?: FomoDataRow[];
  isLoading?: boolean;
}

const tooltipStyle = {
  backgroundColor: "hsl(225, 22%, 10%)",
  border: "1px solid hsl(225, 16%, 18%)",
  borderRadius: "12px",
  color: "hsl(210, 20%, 95%)",
  fontSize: 11,
  fontFamily: "'JetBrains Mono', monospace",
  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  padding: "6px 10px",
};

/* Zoom control buttons shared by both charts */
const ZoomControls = ({
  zoomIn,
  zoomOut,
  reset,
  isFullView,
  isMaxZoom,
  zoomPercent,
}: {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  isFullView: boolean;
  isMaxZoom: boolean;
  zoomPercent: number;
}) => (
  <div className="flex items-center gap-2">
    {!isFullView && (
      <span className="text-[9px] text-muted-foreground font-mono bg-secondary/40 rounded-full px-1.5 py-0.5">
        {zoomPercent}%
      </span>
    )}
    <div className="flex bg-secondary/40 border border-border/30 rounded-lg p-0.5">
      {[
        { Icon: Maximize2, action: reset, disabled: isFullView, title: "Reset" },
        { Icon: ZoomIn, action: zoomIn, disabled: isMaxZoom, title: "Phóng to" },
        { Icon: ZoomOut, action: zoomOut, disabled: isFullView, title: "Thu nhỏ" },
      ].map(({ Icon, action, disabled, title }) => (
        <button
          key={title}
          onClick={action}
          disabled={disabled}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${
            disabled
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
          title={title}
        >
          <Icon className="w-3 h-3" />
        </button>
      ))}
    </div>
  </div>
);

const MNCharts = ({ data, isLoading }: MNChartsProps) => {
  const safeData = data ?? [];

  // Separate zoom for M and N charts
  const mZoom = useChartZoom(safeData, { totalPoints: safeData.length, minWindow: 15 });
  const nZoom = useChartZoom(safeData, { totalPoints: safeData.length, minWindow: 15 });

  const { latestM, latestN, mChange, nChange } = useMemo(() => {
    if (!data || data.length === 0)
      return { latestM: 0, latestN: 0, mChange: 0, nChange: 0 };

    const latest = data[data.length - 1];
    const mid = data[Math.floor(data.length / 2)];

    const mPctChange = mid.m !== 0 ? ((latest.m - mid.m) / Math.abs(mid.m)) * 100 : 0;
    const nPctChange = mid.n !== 0 ? ((latest.n - mid.n) / Math.abs(mid.n)) * 100 : 0;

    return {
      latestM: latest.m,
      latestN: latest.n,
      mChange: mPctChange,
      nChange: nPctChange,
    };
  }, [data]);

  // Build chart data from zoomed windows
  const mChartData = useMemo(
    () => mZoom.visibleData.map((row) => ({
      time: row.time.length > 10 ? row.time.slice(11, 16) : row.time,
      value: +row.m.toFixed(4),
    })),
    [mZoom.visibleData],
  );

  const nChartData = useMemo(
    () => nZoom.visibleData.map((row) => ({
      time: row.time.length > 10 ? row.time.slice(11, 16) : row.time,
      value: +row.n.toFixed(4),
    })),
    [nZoom.visibleData],
  );

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="finshark-card p-5 stat-glow-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="section-title">M · Tổng FOMO</span>
              <div
                className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                  mChange >= 0
                    ? "text-primary bg-primary/8"
                    : "text-destructive bg-destructive/8"
                }`}
              >
                {mChange >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {mChange >= 0 ? "+" : ""}
                {mChange.toFixed(1)}%
              </div>
            </div>
            <p className="text-3xl font-extrabold gradient-text mono tracking-tight">
              {latestM.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="finshark-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="section-title">N · Trung bình</span>
              <div
                className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                  nChange >= 0
                    ? "text-primary bg-primary/8"
                    : "text-destructive bg-destructive/8"
                }`}
              >
                {nChange >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {nChange >= 0 ? "+" : ""}
                {nChange.toFixed(1)}%
              </div>
            </div>
            <p className="text-3xl font-extrabold gradient-text-warm mono tracking-tight">
              {latestN.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Area charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* M Chart */}
        <div className="finshark-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground">M (Total FOMO)</span>
            </div>
            <ZoomControls {...mZoom} />
          </div>
          <div className="h-[200px]">
            {mChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mChartData}>
                  <defs>
                    <linearGradient id="mGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(225, 16%, 12%)" strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(158, 64%, 52%)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(158, 64%, 52%)" strokeWidth={2.5} fill="url(#mGrad2)" dot={false} activeDot={{ r: 4, fill: "hsl(158, 64%, 52%)", strokeWidth: 2, stroke: "hsl(225, 25%, 7%)" }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                Không có dữ liệu
              </div>
            )}
          </div>
        </div>

        {/* N Chart */}
        <div className="finshark-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-warning" />
              <span className="text-xs font-bold text-foreground">N (Average)</span>
            </div>
            <ZoomControls {...nZoom} />
          </div>
          <div className="h-[200px]">
            {nChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={nChartData}>
                  <defs>
                    <linearGradient id="nGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(36, 100%, 57%)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(36, 100%, 57%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(225, 16%, 12%)" strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(36, 100%, 57%)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(36, 100%, 57%)" strokeWidth={2.5} fill="url(#nGrad2)" dot={false} activeDot={{ r: 4, fill: "hsl(36, 100%, 57%)", strokeWidth: 2, stroke: "hsl(225, 25%, 7%)" }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                Không có dữ liệu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MNCharts;
