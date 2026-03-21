import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  backgroundColor: "hsl(225, 22%, 10%)",
  border: "1px solid hsl(225, 16%, 18%)",
  borderRadius: "12px",
  color: "hsl(210, 20%, 95%)",
  fontSize: 11,
  fontFamily: "'JetBrains Mono', monospace",
  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  padding: "6px 10px",
};

const MNCharts = () => {
  return (
    <div className="space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="finshark-card p-5 stat-glow-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="section-title">M · Tổng FOMO</span>
              <div className="flex items-center gap-1 text-primary text-[10px] font-semibold bg-primary/8 rounded-full px-2 py-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +12.4%
              </div>
            </div>
            <p className="text-3xl font-extrabold gradient-text mono tracking-tight">2,005.58</p>
          </div>
        </div>

        <div className="finshark-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="section-title">N · Trung bình</span>
              <div className="flex items-center gap-1 text-destructive text-[10px] font-semibold bg-destructive/8 rounded-full px-2 py-0.5">
                <ArrowDownRight className="w-3 h-3" />
                -3.2%
              </div>
            </div>
            <p className="text-3xl font-extrabold gradient-text-warm mono tracking-tight">2.1156</p>
          </div>
        </div>
      </div>

      {/* Period toggle */}
      <div className="flex items-center gap-2">
        <div className="flex bg-secondary/40 border border-border/30 rounded-xl p-0.5">
          <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-card text-foreground shadow-sm border border-border/40">
            Hôm nay
          </button>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Tích lũy
          </button>
        </div>
      </div>

      {/* Area charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="finshark-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">M (Total FOMO)</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mData}>
                <defs>
                  <linearGradient id="mGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(158, 64%, 52%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(225, 16%, 12%)" strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(158, 64%, 52%)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="hsl(158, 64%, 52%)" strokeWidth={2.5} fill="url(#mGrad2)" dot={false} activeDot={{ r: 4, fill: "hsl(158, 64%, 52%)", strokeWidth: 2, stroke: "hsl(225, 25%, 7%)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="finshark-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-warning" />
            <span className="text-xs font-bold text-foreground">N (Average)</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={nData}>
                <defs>
                  <linearGradient id="nGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(36, 100%, 57%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(36, 100%, 57%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(225, 16%, 12%)" strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 9, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(36, 100%, 57%)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="hsl(36, 100%, 57%)" strokeWidth={2.5} fill="url(#nGrad2)" dot={false} activeDot={{ r: 4, fill: "hsl(36, 100%, 57%)", strokeWidth: 2, stroke: "hsl(225, 25%, 7%)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MNCharts;
