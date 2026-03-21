import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";

const AnalysisResults = () => {
  const statsData = [
    { label: "PH% (High above P)", avg: "0.0223%", median: "0.013%", min: "-1.64%", max: "2.1183%" },
    { label: "PL% (P above Low)", avg: "0.0242%", median: "0.01%", min: "-1.1371%", max: "2.5273%" },
    { label: "HO (High - Open)", avg: "1.1878", median: "0.26", min: "0", max: "63.54" },
    { label: "LO (Open - Low)", avg: "1.1315", median: "0.18", min: "0", max: "121.77" },
    { label: "Buy RR (C-L)/SL", placeholder: true },
    { label: "Sell RR (H-C)/SL", placeholder: true },
    { label: "RR Max (H-L)/SL", placeholder: true },
  ];

  const tableData = [
    { time: "03-21 05:51", price: 4498, signal: "SELL", fomo: 0.89, chain: "c", m: 2005.58, n: 2.12, ncH: 4497.63, ncL: 4497.41, ph: "-0.008%", pl: "0.013%", bw: "NO", sw: "NO" },
    { time: "03-21 05:01", price: 4497, signal: "SELL", fomo: -1.01, chain: "c", m: 2006.48, n: 2.12, ncH: 4497.53, ncL: 4497.41, ph: "0.012%", pl: "-0.009%", bw: "NO", sw: "NO" },
    { time: "03-21 04:56", price: 4497, signal: "NONE", fomo: -1.66, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.59, ncL: 4497.41, ph: "0.013%", pl: "-0.009%", bw: "NO", sw: "NO" },
    { time: "03-21 04:51", price: 4498, signal: "NONE", fomo: 0.89, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.61, ncL: 4497.41, ph: "-0.009%", pl: "0.013%", bw: "NO", sw: "NO" },
    { time: "03-21 04:46", price: 4498, signal: "NONE", fomo: 0.89, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.52, ncL: 4497.41, ph: "-0.011%", pl: "0.013%", bw: "NO", sw: "NO" },
    { time: "03-21 04:41", price: 4497, signal: "NONE", fomo: -1.42, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.53, ncL: 4497.41, ph: "0.012%", pl: "-0.009%", bw: "NO", sw: "NO" },
    { time: "03-21 04:36", price: 4497, signal: "NONE", fomo: -1.82, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.63, ncL: 4497.41, ph: "0.014%", pl: "-0.009%", bw: "NO", sw: "NO" },
    { time: "03-21 04:31", price: 4498, signal: "NONE", fomo: 0.89, chain: "a", m: 2005.47, n: 2.12, ncH: 4497.59, ncL: 4497.41, ph: "-0.009%", pl: "0.013%", bw: "NO", sw: "NO" },
    { time: "03-21 04:01", price: 4496, signal: "SELL", fomo: 0.74, chain: "c", m: 2005.47, n: 2.12, ncH: 4497.51, ncL: 4497.39, ph: "0.034%", pl: "-0.031%", bw: "NO", sw: "NO" },
    { time: "03-21 03:56", price: 4499, signal: "NONE", fomo: 0.0, chain: "a", m: 2005.84, n: 2.12, ncH: 4496.31, ncL: 4494.76, ph: "-0.06%", pl: "0.094%", bw: "NO", sw: "NO" },
  ];

  const signalColor = (s: string) =>
    s === "SELL" ? "text-destructive" : s === "BUY" ? "text-primary" : "text-muted-foreground";

  return (
    <div className="mt-5 space-y-4 animate-fade-in">
      {/* Summary strip */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Kết quả:</span>
        <span className="text-sm font-bold text-foreground tabular-nums">14,331</span>
        <span className="text-xs text-muted-foreground">bản ghi</span>
      </div>

      {/* Win rate cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="finshark-card p-5 text-center stat-glow-green">
          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Mua thắng</p>
          <p className="text-3xl font-bold text-primary tabular-nums">9.13<span className="text-lg">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">1,309 / 14,331</p>
        </div>
        <div className="finshark-card p-5 text-center stat-glow-red">
          <TrendingDown className="w-5 h-5 text-destructive mx-auto mb-2" />
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Bán thắng</p>
          <p className="text-3xl font-bold text-destructive tabular-nums">8.44<span className="text-lg">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">1,209 / 14,331</p>
        </div>
        <div className="finshark-card p-5 text-center">
          <Minus className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Không thắng</p>
          <p className="text-3xl font-bold text-foreground tabular-nums">82.43<span className="text-lg">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">11,813 / 14,331</p>
        </div>
      </div>

      {/* Statistics table */}
      <div className="finshark-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40">
          <Info className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">Thống kê nến tiếp theo</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30">
              <th className="table-header text-left">Chỉ số</th>
              <th className="table-header text-right">Trung bình</th>
              <th className="table-header text-right">Trung vị</th>
              <th className="table-header text-right">Min</th>
              <th className="table-header text-right">Max</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((row, i) => (
              <tr key={i} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                <td className="data-cell font-medium text-foreground">{row.label}</td>
                {row.placeholder ? (
                  <td colSpan={4} className="data-cell text-center text-muted-foreground/60 italic text-xs">
                    Nhập SL rồi nhấn Phân tích
                  </td>
                ) : (
                  <>
                    <td className="data-cell text-right tabular-nums text-foreground">{row.avg}</td>
                    <td className="data-cell text-right tabular-nums text-primary">{row.median}</td>
                    <td className="data-cell text-right tabular-nums text-muted-foreground">{row.min}</td>
                    <td className="data-cell text-right tabular-nums text-primary">{row.max}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data table */}
      <div className="finshark-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40">
          <span className="text-xs font-semibold text-foreground">Dữ liệu chi tiết</span>
          <span className="text-[10px] text-muted-foreground ml-1">200 bản ghi</span>
        </div>
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-border/30">
                {["Thời gian", "Giá", "Tín hiệu", "FOMO", "Chuỗi", "M", "N", "NC↑", "NC↓", "PH%", "PL%", "Mua", "Bán"].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="data-cell tabular-nums text-muted-foreground">{row.time}</td>
                  <td className="data-cell tabular-nums font-medium text-foreground">{row.price}</td>
                  <td className={`data-cell font-bold ${signalColor(row.signal)}`}>{row.signal}</td>
                  <td className={`data-cell tabular-nums ${row.fomo >= 0 ? "text-primary" : "text-destructive"}`}>
                    {row.fomo > 0 ? "+" : ""}{row.fomo}
                  </td>
                  <td className="data-cell text-foreground">{row.chain}</td>
                  <td className="data-cell tabular-nums text-muted-foreground">{row.m}</td>
                  <td className="data-cell tabular-nums text-muted-foreground">{row.n}</td>
                  <td className="data-cell tabular-nums text-muted-foreground">{row.ncH}</td>
                  <td className="data-cell tabular-nums text-muted-foreground">{row.ncL}</td>
                  <td className="data-cell tabular-nums text-foreground">{row.ph}</td>
                  <td className="data-cell tabular-nums text-foreground">{row.pl}</td>
                  <td className="data-cell text-muted-foreground">{row.bw}</td>
                  <td className="data-cell text-muted-foreground">{row.sw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
