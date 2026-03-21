import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const generateMockData = () => {
  const data = [];
  for (let price = 4769; price <= 5041; price += 16) {
    const positive = Math.random() * 600;
    const negative = -(Math.random() * 400);
    data.push({ price, positive: Math.round(positive), negative: Math.round(negative) });
  }
  return data;
};

const data = generateMockData();

const FOMOChart = () => {
  return (
    <div className="finshark-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(220, 65%, 55%)" }} />
            <span className="text-[11px] text-muted-foreground">Tích cực</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(4, 72%, 58%)" }} />
            <span className="text-[11px] text-muted-foreground">Tiêu cực</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-muted" />
            <span className="text-[11px] text-muted-foreground">Trung lập</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[
            { icon: Maximize2, label: "Reset" },
            { icon: ZoomIn, label: "Phóng to" },
            { icon: ZoomOut, label: "Thu nhỏ" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title={label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={1} margin={{ left: 5, right: 5 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="price"
              type="category"
              width={45}
              tick={{ fill: "hsl(220, 8%, 50%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 12%)",
                border: "1px solid hsl(220, 14%, 18%)",
                borderRadius: "8px",
                color: "hsl(220, 10%, 93%)",
                fontSize: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            />
            <Bar dataKey="positive" stackId="a" radius={[0, 2, 2, 0]}>
              {data.map((_, i) => (
                <Cell key={`pos-${i}`} fill="hsl(220, 65%, 55%)" />
              ))}
            </Bar>
            <Bar dataKey="negative" stackId="a" radius={[2, 0, 0, 2]}>
              {data.map((_, i) => (
                <Cell key={`neg-${i}`} fill="hsl(4, 72%, 58%)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FOMOChart;
