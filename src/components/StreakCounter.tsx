const StreakCounter = () => {
  const historyData = [
    { endTime: "2026-03-20 12:56:37", bias: "Tích cực", length: 53, totalFomo: 25.2401, priceDiff: 42.61 },
    { endTime: "2026-03-20 01:11:56", bias: "Tiêu cực", length: 76, totalFomo: -16.0645, priceDiff: 91.26 },
    { endTime: "2026-03-19 07:06:56", bias: "Tiêu cực", length: 93, totalFomo: -14.186, priceDiff: 36.19 },
    { endTime: "2026-03-18 13:11:58", bias: "Tiêu cực", length: 24, totalFomo: 0.0177, priceDiff: 21.76 },
    { endTime: "2026-03-18 07:06:34", bias: "Tiêu cực", length: 61, totalFomo: -5.3052, priceDiff: 12.98 },
    { endTime: "2026-03-17 13:37:11", bias: "Tích cực", length: 60, totalFomo: 17.5964, priceDiff: 28.14 },
  ];

  return (
    <div>
      <h3 className="text-foreground font-bold text-center mb-4">
        Bộ đếm chuỗi xu hướng (Liên tiếp 20+)
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Positive streak */}
        <div className="finshark-card p-4 text-center border-primary/30">
          <h4 className="text-primary font-bold text-sm mb-3">Chuỗi Tích cực</h4>
          <div className="flex justify-center gap-8">
            <div>
              <p className="text-xs text-muted-foreground">ĐỘ DÀI</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">TỔNG FOMO</p>
              <p className="text-2xl font-bold text-foreground">0.0000</p>
            </div>
          </div>
          <span className="inline-block mt-2 text-[10px] px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
            Not reached 20 (0/20)
          </span>
        </div>

        {/* Negative streak */}
        <div className="finshark-card p-4 text-center border-destructive/30">
          <h4 className="text-destructive font-bold text-sm mb-3">Chuỗi Tiêu cực</h4>
          <div className="flex justify-center gap-8">
            <div>
              <p className="text-xs text-muted-foreground">ĐỘ DÀI</p>
              <p className="text-2xl font-bold text-foreground">43</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">TỔNG FOMO</p>
              <p className="text-2xl font-bold text-destructive">-8.5008</p>
            </div>
          </div>
          <span className="inline-block mt-2 text-[10px] px-3 py-1 rounded-full bg-green-500/20 text-green-400">
            ACTIVE (20+)
          </span>
        </div>
      </div>

      {/* History table */}
      <h4 className="text-foreground font-bold text-center text-sm mb-3">Lịch sử chuỗi hoàn thành</h4>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0">
            <tr className="border-b border-border bg-card">
              <th className="text-left py-2 px-3 text-primary text-xs font-medium">END TIME (VN)</th>
              <th className="text-left py-2 px-3 text-primary text-xs font-medium">BIAS</th>
              <th className="text-right py-2 px-3 text-primary text-xs font-medium">STREAK LENGTH</th>
              <th className="text-right py-2 px-3 text-primary text-xs font-medium">TOTAL FOMO</th>
              <th className="text-right py-2 px-3 text-primary text-xs font-medium">PRICE DIFF</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-2 px-3 text-foreground">{row.endTime}</td>
                <td className={`py-2 px-3 font-medium ${row.bias === "Tích cực" ? "text-primary" : "text-destructive"}`}>
                  {row.bias}
                </td>
                <td className="py-2 px-3 text-right text-foreground">{row.length}</td>
                <td className="py-2 px-3 text-right text-foreground">{row.totalFomo}</td>
                <td className="py-2 px-3 text-right text-foreground">{row.priceDiff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StreakCounter;
