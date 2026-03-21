const AnalysisResults = () => {
  const statsData = [
    { label: "PH% (High above P)", avg: "0.0223%", median: "0.013%", min: "-1.64%", max: "2.1183%" },
    { label: "PL% (P above Low)", avg: "0.0242%", median: "0.01%", min: "-1.1371%", max: "2.5273%" },
    { label: "HO (High - Open)", avg: "1.1878", median: "0.26", min: "0", max: "63.54" },
    { label: "LO (Open - Low)", avg: "1.1315", median: "0.18", min: "0", max: "121.77" },
    { label: "Buy RR (C-L)/SL", avg: "", median: "", min: "", max: "", placeholder: "Enter SL and click Analyze" },
    { label: "Sell RR (H-C)/SL", avg: "", median: "", min: "", max: "", placeholder: "Enter SL and click Analyze" },
    { label: "RR Max (H-L)/SL", avg: "", median: "", min: "", max: "", placeholder: "Enter SL and click Analyze" },
  ];

  const tableData = [
    { time: "03-21 05:51:44", price: 4498, signal: "SELL", fomo: 0.8944, chain: "c", m: 2005.58, n: 2.1156, ncHigh: 4497.62777, ncLow: 4497.41399, ph: "-0.0083%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 05:01:55", price: 4497, signal: "SELL", fomo: -1.0124, chain: "c", m: 2006.48, n: 2.1188, ncHigh: 4497.53461, ncLow: 4497.40808, ph: "0.0119%", pl: "-0.0091%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:56:32", price: 4497, signal: "NONE", fomo: -1.656, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.58914, ncLow: 4497.41399, ph: "0.0131%", pl: "-0.0092%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:51:49", price: 4498, signal: "NONE", fomo: 0.8944, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.61205, ncLow: 4497.41399, ph: "-0.0086%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:46:26", price: 4498, signal: "NONE", fomo: 0.8944, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.52354, ncLow: 4497.41399, ph: "-0.0106%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:41:44", price: 4497, signal: "NONE", fomo: -1.4225, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.53282, ncLow: 4497.41399, ph: "0.0118%", pl: "-0.0092%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:36:21", price: 4497, signal: "NONE", fomo: -1.8178, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.6253, ncLow: 4497.41399, ph: "0.0139%", pl: "-0.0092%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:31:38", price: 4498, signal: "NONE", fomo: 0.8944, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.59493, ncLow: 4497.41399, ph: "-0.009%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:26:55", price: 4498, signal: "NONE", fomo: 0.8944, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.52359, ncLow: 4497.41399, ph: "-0.0106%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:22:12", price: 4497, signal: "NONE", fomo: 0.0, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.50896, ncLow: 4497.41378, ph: "0.0113%", pl: "-0.0092%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:16:49", price: 4497, signal: "NONE", fomo: -0.9512, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.59335, ncLow: 4497.41399, ph: "0.0132%", pl: "-0.0092%", buyWin: "NO", sellWin: "NO" },
    { time: "03-21 04:11:27", price: 4498, signal: "NONE", fomo: 0.6776, chain: "a", m: 2005.47, n: 2.1199, ncHigh: 4497.60069, ncLow: 4497.41399, ph: "-0.0089%", pl: "0.013%", buyWin: "NO", sellWin: "NO" },
  ];

  return (
    <div className="mt-8 space-y-8">
      {/* Results summary */}
      <h3 className="text-primary font-bold text-lg">
        Kết quả: 14,331 bản ghi phù hợp
      </h3>

      {/* Win rate cards */}
      <div className="grid grid-cols-3 divide-x divide-border finshark-card">
        <div className="p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Mua thắng</p>
          <p className="text-3xl font-bold text-primary">9.13%</p>
          <p className="text-xs text-muted-foreground mt-1">1309 / 14331</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Bán thắng</p>
          <p className="text-3xl font-bold text-destructive">8.44%</p>
          <p className="text-xs text-muted-foreground mt-1">1209 / 14331</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Không thắng</p>
          <p className="text-3xl font-bold text-foreground">82.43%</p>
          <p className="text-xs text-muted-foreground mt-1">11813 / 14331</p>
        </div>
      </div>

      {/* Statistics table */}
      <div>
        <h3 className="text-primary font-bold uppercase text-sm mb-3">Thống kê nến tiếp theo</h3>
        <div className="finshark-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left text-primary text-xs font-medium">Chỉ số</th>
                <th className="py-3 px-4 text-center text-primary text-xs font-medium">Trung bình</th>
                <th className="py-3 px-4 text-center text-primary text-xs font-medium">Trung vị</th>
                <th className="py-3 px-4 text-center text-primary text-xs font-medium">Min</th>
                <th className="py-3 px-4 text-center text-primary text-xs font-medium">Max</th>
              </tr>
            </thead>
            <tbody>
              {statsData.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 text-foreground font-medium">{row.label}</td>
                  {row.placeholder ? (
                    <td colSpan={4} className="py-3 px-4 text-center text-muted-foreground italic text-xs">
                      {row.placeholder}
                    </td>
                  ) : (
                    <>
                      <td className="py-3 px-4 text-center text-foreground">{row.avg}</td>
                      <td className="py-3 px-4 text-center text-primary">{row.median}</td>
                      <td className="py-3 px-4 text-center text-foreground">{row.min}</td>
                      <td className="py-3 px-4 text-center text-primary">{row.max}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data table */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">Showing 200 records</p>
        <div className="finshark-card overflow-x-auto">
          <table className="w-full text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-border">
                {["Thời gian", "Giá", "Tín hiệu", "FOMO", "Chuỗi", "M", "N", "NC Cao", "NC Thấp", "PH%", "PL%", "Mua Thắng", "Bán Thắng", "RR Mua", "RR Bán", "Buy RR Max", "Sell RR Max"].map((h) => (
                  <th key={h} className="py-2.5 px-3 text-primary text-xs font-medium text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="py-2 px-3 text-foreground">{row.time}</td>
                  <td className="py-2 px-3 text-foreground">{row.price}</td>
                  <td className={`py-2 px-3 font-bold ${
                    row.signal === "SELL" ? "text-destructive" :
                    row.signal === "BUY" ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {row.signal}
                  </td>
                  <td className={`py-2 px-3 ${row.fomo >= 0 ? "text-primary" : "text-destructive"}`}>
                    {row.fomo}
                  </td>
                  <td className="py-2 px-3 text-foreground">{row.chain}</td>
                  <td className="py-2 px-3 text-foreground">{row.m}</td>
                  <td className="py-2 px-3 text-foreground">{row.n}</td>
                  <td className="py-2 px-3 text-foreground">{row.ncHigh}</td>
                  <td className="py-2 px-3 text-foreground">{row.ncLow}</td>
                  <td className="py-2 px-3 text-foreground">{row.ph}</td>
                  <td className="py-2 px-3 text-foreground">{row.pl}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.buyWin}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.sellWin}</td>
                  <td className="py-2 px-3 text-muted-foreground"></td>
                  <td className="py-2 px-3 text-muted-foreground"></td>
                  <td className="py-2 px-3 text-muted-foreground"></td>
                  <td className="py-2 px-3 text-muted-foreground"></td>
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
