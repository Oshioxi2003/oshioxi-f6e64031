import { Clock, ArrowDown, ArrowUp, Minus } from "lucide-react";

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

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "Tiêu cực") return <ArrowDown className="w-3 h-3 text-destructive" />;
    if (trend === "Tích cực") return <ArrowUp className="w-3 h-3 text-primary" />;
    return <Minus className="w-3 h-3 text-muted-foreground/50" />;
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Clock className="w-3.5 h-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">Dữ liệu gần đây</h3>
      </div>

      <div className="max-h-[340px] overflow-y-auto scroll-thin space-y-0.5">
        {data.map((row, i) => (
          <div
            key={i}
            className="flex items-center rounded-xl px-3 py-2.5 hover:bg-secondary/30 transition-colors duration-200 text-xs group"
          >
            <span className="text-muted-foreground mono text-[11px] w-[70px] shrink-0">
              {row.time}
            </span>

            <span className="text-foreground font-bold mono text-[12px] w-[45px] shrink-0">{row.price}</span>

            <div className="w-6 h-6 rounded-lg bg-secondary/40 flex items-center justify-center mx-2">
              <TrendIcon trend={row.trend} />
            </div>

            <span className={`ml-auto mono text-[12px] font-bold ${
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
