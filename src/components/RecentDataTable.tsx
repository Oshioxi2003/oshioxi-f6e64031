import { Clock } from "lucide-react";

const RecentDataTable = () => {
  const data = [
    { day: "21/03", time: "05:31", price: 4498, trend: "Tiêu cực", fomo: 0.89 },
    { day: "21/03", time: "05:26", price: 4498, trend: "Trung lập", fomo: 0.89 },
    { day: "21/03", time: "05:21", price: 4497, trend: "Trung lập", fomo: -0.7 },
    { day: "21/03", time: "05:16", price: 4497, trend: "Trung lập", fomo: -2.12 },
    { day: "21/03", time: "05:11", price: 4498, trend: "Trung lập", fomo: 0.89 },
    { day: "21/03", time: "05:06", price: 4498, trend: "Trung lập", fomo: 0.89 },
    { day: "21/03", time: "05:01", price: 4497, trend: "Tiêu cực", fomo: -1.01 },
    { day: "21/03", time: "04:56", price: 4497, trend: "Trung lập", fomo: -1.66 },
    { day: "21/03", time: "04:51", price: 4498, trend: "Trung lập", fomo: 0.89 },
    { day: "21/03", time: "04:46", price: 4498, trend: "Trung lập", fomo: 0.89 },
  ];

  const trendColor = (t: string) =>
    t === "Tiêu cực" ? "text-destructive" :
    t === "Tích cực" ? "text-primary" : "text-muted-foreground";

  const TrendDot = ({ trend }: { trend: string }) => (
    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
      trend === "Tiêu cực" ? "bg-destructive" :
      trend === "Tích cực" ? "bg-primary" : "bg-muted-foreground"
    }`} />
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Dữ liệu gần đây</h3>
      </div>

      <div className="max-h-[320px] overflow-y-auto scroll-thin space-y-0.5">
        {data.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg px-3 py-2 hover:bg-secondary/40 transition-colors text-xs"
          >
            <span className="text-muted-foreground tabular-nums w-[70px] shrink-0">
              {row.day} {row.time}
            </span>
            <span className="text-foreground font-medium tabular-nums w-[40px]">{row.price}</span>
            <span className={`flex items-center w-[72px] shrink-0 ${trendColor(row.trend)}`}>
              <TrendDot trend={row.trend} />
              {row.trend}
            </span>
            <span className={`ml-auto tabular-nums font-medium ${
              row.fomo >= 0 ? "text-primary" : "text-destructive"
            }`}>
              {row.fomo > 0 ? "+" : ""}{row.fomo.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDataTable;
