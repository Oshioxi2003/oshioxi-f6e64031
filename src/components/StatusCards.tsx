import { Activity, Clock, Wifi, ArrowUpRight } from "lucide-react";

const StatusCards = () => (
  <div className="flex items-center gap-2">
    {/* Ready badge */}
    <div className="flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-2xl px-4 py-2.5">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
      <span className="text-xs font-semibold text-primary">Ready</span>
    </div>

    {/* Time badge */}
    <div className="flex items-center gap-2 bg-secondary/50 border border-border/30 rounded-2xl px-4 py-2.5">
      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs font-semibold text-foreground mono">05:56:26</span>
      <span className="text-[10px] text-muted-foreground">21/03</span>
    </div>

    {/* Live badge */}
    <div className="flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-2xl px-4 py-2.5">
      <Wifi className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold text-primary">Live</span>
    </div>
  </div>
);

export default StatusCards;
