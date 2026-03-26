import { Clock, ArrowDown, ArrowUp, Minus, Loader2 } from "lucide-react";
import type { FomoDataRow } from "@/hooks/useFomoData";

interface RecentDataTableProps {
  data?: FomoDataRow[];
  isLoading?: boolean;
}

const RecentDataTable = ({ data, isLoading }: RecentDataTableProps) => {
  // Take last 15 entries, reversed (newest first)
  const rows = data ? [...data].reverse().slice(0, 15) : [];

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
        {rows.length > 0 && (
          <span className="text-[10px] text-muted-foreground bg-secondary/40 rounded-full px-2 py-0.5 font-semibold">
            {rows.length} bản ghi
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="h-[200px] flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-xs text-muted-foreground">
          Không có dữ liệu
        </div>
      ) : (
        <div className="max-h-[340px] overflow-y-auto scroll-thin space-y-0.5">
          {rows.map((row, i) => {
            // Parse time from datetime string
            const timeStr = row.time.length > 10 ? row.time.slice(11, 16) : row.time;

            return (
              <div
                key={i}
                className="flex items-center rounded-xl px-3 py-2.5 hover:bg-secondary/30 transition-colors duration-200 text-xs group"
              >
                <span className="text-muted-foreground mono text-[11px] w-[70px] shrink-0">
                  {timeStr}
                </span>

                <span className="text-foreground font-bold mono text-[12px] w-[65px] shrink-0">
                  {row.price.toFixed(2)}
                </span>

                <div className="w-6 h-6 rounded-lg bg-secondary/40 flex items-center justify-center mx-2">
                  <TrendIcon trend={row.trend} />
                </div>

                <span
                  className={`ml-auto mono text-[12px] font-bold ${
                    row.compression >= 0 ? "text-primary" : "text-destructive"
                  }`}
                >
                  {row.compression > 0 ? "+" : ""}
                  {row.compression.toFixed(4)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentDataTable;
