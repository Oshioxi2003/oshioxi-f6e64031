import { Flame } from "lucide-react";

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
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Chuỗi xu hướng</h3>
      </div>

      {/* Streak cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">Tích cực</p>
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold text-foreground tabular-nums">0</span>
            <span className="text-xs text-muted-foreground">chuỗi</span>
          </div>
          <div className="mt-1.5 w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary/30 rounded-full" style={{ width: "0%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">0/20 để kích hoạt</p>
        </div>

        <div className="rounded-lg bg-destructive/5 border border-destructive/15 p-3">
          <p className="text-[10px] text-muted-foreground uppercase mb-1">Tiêu cực</p>
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold text-foreground tabular-nums">43</span>
            <span className="chip chip-active text-[9px] !px-2 !py-0.5 !bg-primary !text-primary-foreground">ACTIVE</span>
          </div>
          <div className="mt-1.5 w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-destructive rounded-full" style={{ width: "100%" }} />
          </div>
          <p className="text-[10px] text-destructive mt-1 tabular-nums">FOMO: -8.50</p>
        </div>
      </div>

      {/* History */}
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Lịch sử</p>
      <div className="space-y-1 max-h-[180px] overflow-y-auto scroll-thin">
        {historyData.map((row, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-secondary/40 transition-colors text-xs">
            <span className="text-muted-foreground w-[80px] shrink-0 tabular-nums">{row.endTime}</span>
            <span className={`w-[56px] shrink-0 font-medium ${row.bias === "Tích cực" ? "text-primary" : "text-destructive"}`}>
              {row.bias}
            </span>
            <span className="text-foreground tabular-nums">{row.length}</span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className={`tabular-nums ${row.totalFomo >= 0 ? "text-primary" : "text-destructive"}`}>
              {row.totalFomo > 0 ? "+" : ""}{row.totalFomo}
            </span>
            <span className="ml-auto text-muted-foreground tabular-nums">Δ{row.priceDiff}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCounter;
