import { Activity, Clock, Wifi } from "lucide-react";

const StatusCards = () => {
  const cards = [
    {
      icon: Activity,
      label: "Trạng thái",
      value: "Ready",
      valueClass: "text-primary",
      glow: "stat-glow-green",
    },
    {
      icon: Clock,
      label: "Cập nhật",
      value: "05:56:26",
      sub: "21/03/2026",
      valueClass: "text-foreground",
      glow: "",
    },
    {
      icon: Wifi,
      label: "Luồng dữ liệu",
      value: "Hoạt động",
      valueClass: "text-primary",
      glow: "stat-glow-green",
      pulse: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`finshark-card p-4 flex items-center gap-3 ${card.glow}`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <card.icon className={`w-4.5 h-4.5 ${card.valueClass}`} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{card.label}</p>
            <p className={`text-base font-bold ${card.valueClass} flex items-center gap-1.5`}>
              {card.value}
              {card.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
              )}
            </p>
            {card.sub && <p className="text-[10px] text-muted-foreground">{card.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
