import { Activity, Clock, Wifi, WifiOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface StatusCardsProps {
  latestPrice?: number;
  isLoading?: boolean;
  isError?: boolean;
  lastUpdated?: string;
}

const StatusCards = ({ latestPrice, isLoading, isError, lastUpdated }: StatusCardsProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString("vi-VN", { hour12: false });
  const dateStr = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });

  const isLive = !isLoading && !isError;

  return (
    <div className="flex items-center gap-2">
      {/* Price badge */}
      {latestPrice != null && (
        <div className="flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-2xl px-4 py-2.5">
          <Activity className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary mono">
            {latestPrice.toFixed(2)}
          </span>
        </div>
      )}

      {/* Time badge */}
      <div className="flex items-center gap-2 bg-secondary/50 border border-border/30 rounded-2xl px-4 py-2.5">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground mono">{timeStr}</span>
        <span className="text-[10px] text-muted-foreground">{dateStr}</span>
      </div>

      {/* Live badge */}
      <div
        className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 border ${
          isLive
            ? "bg-primary/8 border-primary/15"
            : isLoading
            ? "bg-warning/8 border-warning/15"
            : "bg-destructive/8 border-destructive/15"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 text-warning animate-spin" />
        ) : isLive ? (
          <>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <Wifi className="w-3.5 h-3.5 text-primary" />
          </>
        ) : (
          <WifiOff className="w-3.5 h-3.5 text-destructive" />
        )}
        <span
          className={`text-xs font-semibold ${
            isLive ? "text-primary" : isLoading ? "text-warning" : "text-destructive"
          }`}
        >
          {isLoading ? "Loading..." : isLive ? "Live" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default StatusCards;
