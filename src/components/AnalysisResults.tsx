import { TrendingUp, TrendingDown, Minus, Info, BarChart3 } from "lucide-react";

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
    s === "SELL" ? "text-destructive" : s === "BUY" ? "text-primary" : "text-muted-foreground/60";

  return (
    <div className="mt-6 space-y-5 animate-fade-in">
      {/* Summary */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-primary" />
        <span className="text-sm font-bold text-foreground">Kết quả:</span>
        <span className="text-sm font-extrabold gradient-text mono">14,331</span>
        <span className="text-xs text-muted-foreground">bản ghi</span>
      </div>

      {/* Win rate cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="finshark-card p-6 text-center stat-glow-green relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="section-title mb-2">Mua thắng</p>
          <p className="text-4xl font-extrabold gradient-text mono tracking-tighter">9.13<span className="text-xl">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-2 mono">1,309 / 14,331</p>
        </div>
        <div className="finshark-card p-6 text-center stat-glow-red relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <TrendingDown className="w-6 h-6 text-destructive mx-auto mb-3" />
          <p className="section-title mb-2">Bán thắng</p>
          <p className="text-4xl font-extrabold gradient-text-red mono tracking-tighter">8.44<span className="text-xl">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-2 mono">1,209 / 14,331</p>
        </div>
        <div className="finshark-card p-6 text-center relative overflow-hidden">
          <Minus className="w-6 h-6 text-muted-foreground/40 mx-auto mb-3" />
          <p className="section-title mb-2">Không thắng</p>
          <p className="text-4xl font-extrabold text-foreground mono tracking-tighter">82.43<span className="text-xl">%</span></p>
          <p className="text-[11px] text-muted-foreground mt-2 mono">11,813 / 14,331</p>
        </div>
      </div>

      {/* Stats table */}
      <div className="finshark-card overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/30">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Info className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground">Thống kê nến tiếp theo</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/20">
              <th className="table-header text-left">Chỉ số</th>
              <th className="table-header text-right">Trung bình</th>
              <th className="table-header text-right">Trung vị</th>
              <th className="table-header text-right">Min</th>
              <th className="table-header text-right">Max</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((row, i) => (
              <tr key={i} className="border-b border-border/10 hover:bg-secondary/15 transition-colors duration-150">
                <td className="data-cell font-semibold text-foreground">{row.label}</td>
                {row.placeholder ? (
                  <td colSpan={4} className="data-cell text-center text-muted-foreground/40 italic text-xs">
                    Nhập SL rồi nhấn Phân tích
                  </td>
                ) : (
                  <>
                    <td className="data-cell text-right mono text-foreground">{row.avg}</td>
                    <td className="data-cell text-right mono text-primary font-medium">{row.median}</td>
                    <td className="data-cell text-right mono text-muted-foreground">{row.min}</td>
                    <td className="data-cell text-right mono text-primary font-medium">{row.max}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data table */}
      <div className="finshark-card overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/30">
          <span className="text-sm font-bold text-foreground">Dữ liệu chi tiết</span>
          <span className="text-[10px] text-muted-foreground/60 bg-secondary/40 rounded-full px-2 py-0.5 font-semibold">200 bản ghi</span>
        </div>
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-border/20">
                {["Thời gian", "Giá", "Tín hiệu", "FOMO", "Chuỗi", "M", "N", "NC↑", "NC↓", "PH%", "PL%", "Mua", "Bán"].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-border/5 hover:bg-secondary/15 transition-colors duration-150">
                  <td className="data-cell mono text-muted-foreground text-[11px]">{row.time}</td>
                  <td className="data-cell mono font-bold text-foreground">{row.price}</td>
                  <td className={`data-cell font-extrabold ${signalColor(row.signal)}`}>{row.signal}</td>
                  <td className={`data-cell mono font-semibold ${row.fomo >= 0 ? "text-primary" : "text-destructive"}`}>
                    {row.fomo > 0 ? "+" : ""}{row.fomo}
                  </td>
                  <td className="data-cell text-foreground">{row.chain}</td>
                  <td className="data-cell mono text-muted-foreground">{row.m}</td>
                  <td className="data-cell mono text-muted-foreground">{row.n}</td>
                  <td className="data-cell mono text-muted-foreground">{row.ncH}</td>
                  <td className="data-cell mono text-muted-foreground">{row.ncL}</td>
                  <td className="data-cell mono text-foreground">{row.ph}</td>
                  <td className="data-cell mono text-foreground">{row.pl}</td>
                  <td className="data-cell text-muted-foreground/50">{row.bw}</td>
                  <td className="data-cell text-muted-foreground/50">{row.sw}</td>
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
