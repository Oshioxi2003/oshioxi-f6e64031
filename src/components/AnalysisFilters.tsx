import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, Search, RotateCcw, Download } from "lucide-react";

interface AnalysisFiltersProps {
  onAnalyze: () => void;
}

type FilterKey = string;

const AnalysisFilters = ({ onAnalyze }: AnalysisFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [signal, setSignal] = useState("TẤT CẢ");
  const [chain, setChain] = useState("TẤT CẢ");
  const [candle, setCandle] = useState("TẤT CẢ");
  const [buyWin, setBuyWin] = useState("TẤT CẢ");
  const [sellWin, setSellWin] = useState("TẤT CẢ");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const ChipGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div>
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`chip ${value === opt ? "chip-active" : "chip-inactive"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const RangeInput = ({ label }: { label: string }) => (
    <div className="flex-1 min-w-[140px]">
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-center gap-1.5">
        <input placeholder="Min" className="finshark-input text-xs !py-1.5 !px-2.5" />
        <span className="text-[10px] text-muted-foreground">—</span>
        <input placeholder="Max" className="finshark-input text-xs !py-1.5 !px-2.5" />
      </div>
    </div>
  );

  return (
    <div className="finshark-card overflow-hidden">
      {/* Main filters */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ChipGroup label="Tín hiệu" options={["TẤT CẢ", "BUY", "SELL", "NONE"]} value={signal} onChange={setSignal} />
          <ChipGroup label="Chuỗi" options={["TẤT CẢ", "a (<3)", "b (3-19)", "c (20+)"]} value={chain} onChange={setChain} />
          <ChipGroup label="Nến" options={["TẤT CẢ", "Xanh", "Đỏ", "Doji"]} value={candle} onChange={setCandle} />
        </div>

        {/* Date + SL */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="text-[11px] text-muted-foreground block mb-1.5">Từ</label>
            <input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="finshark-input text-xs !py-2" />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="text-[11px] text-muted-foreground block mb-1.5">Đến</label>
            <input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} className="finshark-input text-xs !py-2" />
          </div>
          <div className="flex gap-1">
            <button className="chip chip-inactive">Hôm nay</button>
            <button className="chip chip-inactive">7 ngày</button>
          </div>
          <div className="w-[100px]">
            <label className="text-[11px] text-muted-foreground block mb-1.5">SL (Dừng lỗ)</label>
            <input placeholder="e.g. 2" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} className="finshark-input text-xs !py-2" />
          </div>
        </div>
      </div>

      {/* Advanced toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/30 hover:bg-secondary/50 border-t border-border/40 transition-colors"
      >
        <SlidersHorizontal className="w-3 h-3" />
        Bộ lọc nâng cao
        {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="p-5 border-t border-border/40 bg-secondary/10 space-y-4 animate-fade-in">
          <div className="flex flex-wrap gap-4">
            <RangeInput label="M" />
            <RangeInput label="N" />
            <RangeInput label="Điểm FOMO" />
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <RangeInput label="PH%" />
            <RangeInput label="PL%" />
            <ChipGroup label="Mua thắng" options={["TẤT CẢ", "CÓ", "KHÔNG"]} value={buyWin} onChange={setBuyWin} />
            <ChipGroup label="Bán thắng" options={["TẤT CẢ", "CÓ", "KHÔNG"]} value={sellWin} onChange={setSellWin} />
          </div>
          <div className="flex flex-wrap gap-4">
            <RangeInput label="RR Mua" />
            <RangeInput label="RR Bán" />
            <RangeInput label="RR Mua Max" />
            <RangeInput label="RR Bán Max" />
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-border/40 bg-secondary/20">
        <button onClick={onAnalyze} className="finshark-btn !w-auto !py-2 px-6 text-xs flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          Phân tích
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Đặt lại">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-primary border border-primary/30 hover:bg-primary/10 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Xuất CSV
        </button>
      </div>
    </div>
  );
};

export default AnalysisFilters;
