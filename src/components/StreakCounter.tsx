import { Flame, Zap } from "lucide-react";

const StreakCounter = () => {
  const historyData = [
    { endTime: "20/03 12:56", bias: "Tích cực", length: 53, totalFomo: 25.24, priceDiff: 42.61 },
    { endTime: "20/03 01:11", bias: "Tiêu cực", length: 76, totalFomo: -16.06, priceDiff: 91.26 },
    { endTime: "19/03 07:06", bias: "Tiêu cực", length: 93, totalFomo: -14.19, priceDiff: 36.19 },
    { endTime: "18/03 13:11", bias: "Tiêu cực", length: 24, totalFomo: 0.02, priceDiff: 21.76 },
    { endTime: "18/03 07:06", bias: "Tiêu cực", length: 61, totalFomo: -5.31, priceDiff: 12.98 },
  ];

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">Chuỗi xu hướng</h3>
      </div>

      {/* Streak mini-cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl bg-gradient-to-br from-primary/6 to-transparent border border-primary/12 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tích cực</span>
          </div>
          <p className="text-2xl font-extrabold text-foreground mono">0</p>
          <div className="mt-2.5 w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-primary/20 transition-all duration-500" style={{ width: "0%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 mono">0 / 20</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-destructive/6 to-transparent border border-destructive/12 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tiêu cực</span>
            <span className="flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/12 rounded-full px-2 py-0.5">
              <Zap className="w-2.5 h-2.5" /> ACTIVE
            </span>
          </div>
          <p className="text-2xl font-extrabold text-foreground mono">43</p>
          <div className="mt-2.5 w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-destructive transition-all duration-500" style={{ width: "100%" }} />
          </div>
          <p className="text-[10px] text-destructive mt-1.5 mono font-medium">FOMO: −8.50</p>
        </div>
      </div>

      {/* History */}
      <span className="section-title">Lịch sử hoàn thành</span>
      <div className="space-y-0.5 mt-2.5 max-h-[160px] overflow-y-auto scroll-thin">
        {historyData.map((row, i) => (
          <div key={i} className="flex items-center rounded-xl px-3 py-2.5 hover:bg-secondary/30 transition-colors duration-200 text-xs group">
            <span className="text-muted-foreground mono w-[78px] shrink-0 text-[11px]">{row.endTime}</span>
            <span className={`w-[52px] shrink-0 font-bold ${row.bias === "Tích cực" ? "text-primary" : "text-destructive"}`}>
              {row.bias === "Tích cực" ? "↑" : "↓"} {row.length}
            </span>
            <span className={`mono text-[11px] ${row.totalFomo >= 0 ? "text-primary" : "text-destructive"}`}>
              {row.totalFomo > 0 ? "+" : ""}{row.totalFomo}
            </span>
            <span className="ml-auto text-muted-foreground mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
              Δ{row.priceDiff}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCounter;
