import { useState } from "react";

interface FilterState {
  signal: string;
  chain: string;
  candle: string;
  fromDate: string;
  toDate: string;
  stopLoss: string;
  mMin: string;
  mMax: string;
  nMin: string;
  nMax: string;
  fomoMin: string;
  fomoMax: string;
  phMin: string;
  phMax: string;
  plMin: string;
  plMax: string;
  buyWin: string;
  sellWin: string;
  rrBuyMin: string;
  rrBuyMax: string;
  rrSellMin: string;
  rrSellMax: string;
  rrBuyMaxMin: string;
  rrBuyMaxMax: string;
  rrSellMaxMin: string;
  rrSellMaxMax: string;
}

interface AnalysisFiltersProps {
  onAnalyze: () => void;
}

const AnalysisFilters = ({ onAnalyze }: AnalysisFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    signal: "TẤT CẢ", chain: "TẤT CẢ", candle: "TẤT CẢ",
    fromDate: "", toDate: "", stopLoss: "",
    mMin: "", mMax: "", nMin: "", nMax: "",
    fomoMin: "", fomoMax: "", phMin: "", phMax: "",
    plMin: "", plMax: "", buyWin: "TẤT CẢ", sellWin: "TẤT CẢ",
    rrBuyMin: "", rrBuyMax: "", rrSellMin: "", rrSellMax: "",
    rrBuyMaxMin: "", rrBuyMaxMax: "", rrSellMaxMin: "", rrSellMaxMax: "",
  });

  const ButtonGroup = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              value === opt
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const RangeInput = ({ label, minKey, maxKey }: { label: string; minKey: keyof FilterState; maxKey: keyof FilterState }) => (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <input
          placeholder="Min"
          value={filters[minKey]}
          onChange={(e) => setFilters({ ...filters, [minKey]: e.target.value })}
          className="finshark-input !py-1.5 text-xs !w-20"
        />
        <span className="text-xs text-muted-foreground">đến</span>
        <input
          placeholder="Max"
          value={filters[maxKey]}
          onChange={(e) => setFilters({ ...filters, [maxKey]: e.target.value })}
          className="finshark-input !py-1.5 text-xs !w-20"
        />
      </div>
    </div>
  );

  return (
    <div className="finshark-card p-6">
      {/* Row 1: Signal, Chain, Candle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <ButtonGroup
          label="Tín hiệu"
          options={["TẤT CẢ", "BUY", "SELL", "NONE"]}
          value={filters.signal}
          onChange={(v) => setFilters({ ...filters, signal: v })}
        />
        <ButtonGroup
          label="Chuỗi"
          options={["TẤT CẢ", "a (<3)", "b (3-19)", "c (20+)"]}
          value={filters.chain}
          onChange={(v) => setFilters({ ...filters, chain: v })}
        />
        <ButtonGroup
          label="Nến"
          options={["TẤT CẢ", "Xanh", "Đỏ", "Doji"]}
          value={filters.candle}
          onChange={(v) => setFilters({ ...filters, candle: v })}
        />
      </div>

      {/* Row 2: Date range + Stop loss */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Từ</p>
          <input
            type="datetime-local"
            value={filters.fromDate}
            onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
            className="finshark-input !py-1.5 text-xs !w-auto"
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Đến</p>
          <input
            type="datetime-local"
            value={filters.toDate}
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
            className="finshark-input !py-1.5 text-xs !w-auto"
          />
        </div>
        <button className="finshark-input !w-auto !py-1.5 px-4 text-xs text-center cursor-pointer hover:bg-secondary transition-colors">
          Hôm nay
        </button>
        <button className="finshark-input !w-auto !py-1.5 px-4 text-xs text-center cursor-pointer hover:bg-secondary transition-colors">
          7 ngày qua
        </button>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Dừng lỗ (SL)</p>
          <input
            placeholder="e.g. 2"
            value={filters.stopLoss}
            onChange={(e) => setFilters({ ...filters, stopLoss: e.target.value })}
            className="finshark-input !py-1.5 text-xs !w-24"
          />
        </div>
      </div>

      {/* Advanced filters toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-primary text-xs font-bold mb-4 flex items-center gap-1 hover:underline"
      >
        Bộ lọc nâng cao {showAdvanced ? "▼" : "▲"}
      </button>

      {showAdvanced && (
        <div className="space-y-4">
          {/* M, N, FOMO ranges */}
          <div className="flex flex-wrap gap-6">
            <RangeInput label="M" minKey="mMin" maxKey="mMax" />
            <RangeInput label="N" minKey="nMin" maxKey="nMax" />
            <RangeInput label="Điểm FOMO" minKey="fomoMin" maxKey="fomoMax" />
          </div>

          {/* PH%, PL%, Buy/Sell Win */}
          <div className="flex flex-wrap gap-6 items-end">
            <RangeInput label="PH%" minKey="phMin" maxKey="phMax" />
            <RangeInput label="PL%" minKey="plMin" maxKey="plMax" />
            <ButtonGroup
              label="Mua thắng"
              options={["TẤT CẢ", "CÓ", "KHÔNG"]}
              value={filters.buyWin}
              onChange={(v) => setFilters({ ...filters, buyWin: v })}
            />
            <ButtonGroup
              label="Bán thắng"
              options={["TẤT CẢ", "CÓ", "KHÔNG"]}
              value={filters.sellWin}
              onChange={(v) => setFilters({ ...filters, sellWin: v })}
            />
          </div>

          {/* RR ranges */}
          <div className="flex flex-wrap gap-6">
            <RangeInput label="RR Mua" minKey="rrBuyMin" maxKey="rrBuyMax" />
            <RangeInput label="RR Bán" minKey="rrSellMin" maxKey="rrSellMax" />
            <RangeInput label="RR Mua Max" minKey="rrBuyMaxMin" maxKey="rrBuyMaxMax" />
            <RangeInput label="RR Bán Max" minKey="rrSellMaxMin" maxKey="rrSellMaxMax" />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        <button onClick={onAnalyze} className="finshark-btn !w-auto px-8 !py-2.5 text-sm">
          Phân tích
        </button>
        <button className="finshark-input !w-auto px-6 !py-2.5 text-sm text-center cursor-pointer hover:bg-secondary transition-colors">
          Đặt lại
        </button>
        <button className="px-6 py-2.5 rounded-md text-sm font-medium border border-primary text-primary hover:bg-primary/10 transition-colors">
          Xuất CSV
        </button>
      </div>
    </div>
  );
};

export default AnalysisFilters;
