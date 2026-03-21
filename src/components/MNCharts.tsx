import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

const generateTimeData = (min: number, max: number) => {
  const data = [];
  const times = ["00:01", "00:41", "01:21", "02:01", "02:41", "03:21", "04:01", "04:41", "05:21"];
  for (const time of times) {
    data.push({ time, value: +(min + Math.random() * (max - min)).toFixed(4) });
  }
  return data;
};

const mData = generateTimeData(-3, 0);
const nData = generateTimeData(-0.45, -0.15);

const tooltipStyle = {
  backgroundColor: "hsl(220, 18%, 12%)",
  border: "1px solid hsl(220, 14%, 18%)",
  borderRadius: "8px",
  color: "hsl(220, 10%, 93%)",
  fontSize: 11,
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
};

const MNCharts = () => {
  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="finshark-card p-4 stat-glow-green">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">M (Tổng FOMO)</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-primary tabular-nums">2,005.58</p>
        </div>
        <div className="finshark-card p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">N (Trung bình)</span>
            <TrendingDown className="w-4 h-4 text-warning" />
          </div>
          <p className="text-2xl font-bold text-warning tabular-nums">2.1156</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-1 bg-secondary/50 rounded-lg p-0.5 w-fit">
        <button className="px-4 py-1.5 rounded-md text-xs font-medium bg-card text-foreground shadow-sm">
          Hôm nay
        </button>
        <button className="px-4 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          Tích lũy
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="finshark-card p-4">
          <p className="text-xs font-semibold text-foreground mb-3">M (Total FOMO)</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mData}>
                <defs>
                  <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(162, 72%, 46%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(162, 72%, 46%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 8%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 8%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(162, 72%, 46%)" strokeWidth={2} fill="url(#mGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="finshark-card p-4">
          <p className="text-xs font-semibold text-foreground mb-3">N (Average)</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={nData}>
                <defs>
                  <linearGradient id="nGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 8%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 8%, 50%)", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(38, 92%, 55%)" strokeWidth={2} fill="url(#nGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MNCharts;
