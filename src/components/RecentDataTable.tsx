const RecentDataTable = () => {
  const data = [
    { day: "21/03", time: "05:31:32", price: 4498, trend: "Tiêu cực", fomo: 0.8944 },
    { day: "21/03", time: "05:26:50", price: 4498, trend: "Trung lập", fomo: 0.8944 },
    { day: "21/03", time: "05:21:27", price: 4497, trend: "Trung lập", fomo: -0.6989 },
    { day: "21/03", time: "05:16:44", price: 4497, trend: "Trung lập", fomo: -2.1171 },
    { day: "21/03", time: "05:11:21", price: 4498, trend: "Trung lập", fomo: 0.8944 },
    { day: "21/03", time: "05:06:38", price: 4498, trend: "Trung lập", fomo: 0.8944 },
    { day: "21/03", time: "05:01:55", price: 4497, trend: "Tiêu cực", fomo: -1.0124 },
    { day: "21/03", time: "04:56:32", price: 4497, trend: "Trung lập", fomo: -1.656 },
    { day: "21/03", time: "04:51:49", price: 4498, trend: "Trung lập", fomo: 0.8944 },
    { day: "21/03", time: "04:46:26", price: 4498, trend: "Trung lập", fomo: 0.8944 },
    { day: "21/03", time: "04:41:44", price: 4497, trend: "Trung lập", fomo: -1.4225 },
    { day: "21/03", time: "04:36:21", price: 4497, trend: "Trung lập", fomo: -1.8178 },
  ];

  return (
    <div>
      <h3 className="text-primary font-bold text-center mb-4">
        Dữ liệu gần đây (Hôm nay & Hôm qua)
      </h3>
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0">
            <tr className="border-b border-border bg-card">
              <th className="py-2 px-3 text-primary text-xs font-medium text-center">NGÀY</th>
              <th className="py-2 px-3 text-primary text-xs font-medium text-center">GIỜ</th>
              <th className="py-2 px-3 text-primary text-xs font-medium text-center">GIÁ</th>
              <th className="py-2 px-3 text-primary text-xs font-medium text-center">XU HƯỚNG</th>
              <th className="py-2 px-3 text-primary text-xs font-medium text-center">FOMO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-2 px-3 text-center text-foreground">{row.day}</td>
                <td className="py-2 px-3 text-center text-foreground">{row.time}</td>
                <td className="py-2 px-3 text-center text-foreground">{row.price}</td>
                <td className={`py-2 px-3 text-center font-medium ${
                  row.trend === "Tiêu cực" ? "text-destructive" : 
                  row.trend === "Tích cực" ? "text-primary" : "text-muted-foreground"
                }`}>
                  {row.trend}
                </td>
                <td className={`py-2 px-3 text-center font-medium ${
                  row.fomo > 0 ? "text-primary" : "text-destructive"
                }`}>
                  {row.fomo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDataTable;
