import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { ZoomIn, ZoomOut, Maximize2, BarChart3 } from "lucide-react";

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
    <div className="finshark-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Phân phối FOMO</h3>
            <p className="text-[10px] text-muted-foreground">Giá trị tuyệt đối theo mức giá</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-4 mr-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(215, 70%, 60%)" }} />
              <span className="text-[10px] text-muted-foreground font-medium">Tích cực</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(0, 84%, 60%)" }} />
              <span className="text-[10px] text-muted-foreground font-medium">Tiêu cực</span>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex bg-secondary/40 border border-border/30 rounded-xl p-0.5">
            {[
              { icon: Maximize2, label: "Reset" },
              { icon: ZoomIn, label: "Phóng to" },
              { icon: ZoomOut, label: "Thu nhỏ" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
                title={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={2} margin={{ left: 5, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid horizontal={false} stroke="hsl(225, 16%, 13%)" strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="price"
              type="category"
              width={48}
              tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(225, 22%, 10%)",
                border: "1px solid hsl(225, 16%, 18%)",
                borderRadius: "12px",
                color: "hsl(210, 20%, 95%)",
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                padding: "8px 12px",
              }}
              cursor={{ fill: "hsl(225, 16%, 12%)" }}
            />
            <Bar dataKey="positive" stackId="a" radius={[0, 3, 3, 0]}>
              {data.map((_, i) => (
                <Cell key={`pos-${i}`} fill="hsl(215, 70%, 58%)" />
              ))}
            </Bar>
            <Bar dataKey="negative" stackId="a" radius={[3, 0, 0, 3]}>
              {data.map((_, i) => (
                <Cell key={`neg-${i}`} fill="hsl(0, 75%, 58%)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FOMOChart;
