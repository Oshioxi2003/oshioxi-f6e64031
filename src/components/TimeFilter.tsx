import { useState } from "react";
import { Calendar, RotateCcw, Zap } from "lucide-react";

const TimeFilter = () => {
  const [startDate, setStartDate] = useState("2026-03-15T00:00");
  const [endDate, setEndDate] = useState("");
  const [realtime, setRealtime] = useState(true);

  return (
    <div className="finshark-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Bộ lọc thời gian</h3>
        <span className="text-[10px] text-muted-foreground">(GMT+7)</span>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <label className="text-[11px] text-muted-foreground mb-1 block">Bắt đầu</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="finshark-input text-xs !py-2"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-[11px] text-muted-foreground mb-1 block">Kết thúc</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={realtime}
            className="finshark-input text-xs !py-2 disabled:opacity-30"
          />
        </div>

        <label className="flex items-center gap-2 text-xs cursor-pointer bg-secondary/60 rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors">
          <div className="relative">
            <input
              type="checkbox"
              checked={realtime}
              onChange={(e) => setRealtime(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 rounded-full bg-muted peer-checked:bg-primary/30 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-muted-foreground peer-checked:bg-primary peer-checked:translate-x-3.5 transition-all" />
          </div>
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">Realtime</span>
        </label>

        <button className="finshark-btn !w-auto !py-2 px-5 text-xs">Áp dụng</button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Đặt lại">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
        <span>Bản ghi: <span className="text-foreground font-medium">1,441</span></span>
        <span className="w-px h-3 bg-border" />
        <span>Khoảng: <span className="text-foreground">12/01 → 21/03/2026</span></span>
      </div>
    </div>
  );
};

export default TimeFilter;
