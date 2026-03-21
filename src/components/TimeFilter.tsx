import { useState } from "react";
import { Calendar, RotateCcw, Zap, ChevronRight } from "lucide-react";

const TimeFilter = () => {
  const [startDate, setStartDate] = useState("2026-03-15T00:00");
  const [endDate, setEndDate] = useState("");
  const [realtime, setRealtime] = useState(true);

  return (
    <div className="finshark-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Bộ lọc thời gian</h3>
            <p className="text-[10px] text-muted-foreground">GMT+7 · Việt Nam</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mono">
          <span><span className="text-foreground font-semibold">1,441</span> bản ghi</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">12/01 → 21/03</span>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Bắt đầu</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="finshark-input text-xs !py-2.5 mono"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Kết thúc</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={realtime}
            className="finshark-input text-xs !py-2.5 mono disabled:opacity-25"
          />
        </div>

        {/* Realtime toggle */}
        <button
          onClick={() => setRealtime(!realtime)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-250 border ${
            realtime
              ? "bg-primary/10 border-primary/25 text-primary"
              : "bg-secondary/50 border-border/40 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${realtime ? "text-primary" : ""}`} />
          Realtime
          <div className={`w-7 h-4 rounded-full relative transition-colors duration-250 ${realtime ? "bg-primary/30" : "bg-muted"}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-250 ${
              realtime ? "left-3.5 bg-primary" : "left-0.5 bg-muted-foreground"
            }`} />
          </div>
        </button>

        <button className="finshark-btn !w-auto !py-2.5 px-7 text-xs">Áp dụng</button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 border border-transparent hover:border-border/30" title="Đặt lại">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TimeFilter;
