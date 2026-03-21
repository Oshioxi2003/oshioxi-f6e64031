import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const generateMockData = () => {
  const data = [];
  for (let price = 4769; price <= 5041; price += 16) {
    const positive = Math.random() * 600;
    const negative = -(Math.random() * 400);
    data.push({
      price,
      positive: Math.round(positive),
      negative: Math.round(negative),
    });
  }
  return data;
};

const data = generateMockData();

const FOMOChart = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <div />
        <div className="flex gap-2">
          <button className="finshark-input !w-auto !py-1.5 px-3 text-xs cursor-pointer hover:bg-secondary transition-colors">
            Đặt lại Zoom
          </button>
          <button className="finshark-input !w-auto !py-1.5 px-3 text-xs cursor-pointer hover:bg-secondary transition-colors">
            Phóng to
          </button>
          <button className="finshark-input !w-auto !py-1.5 px-3 text-xs cursor-pointer hover:bg-secondary transition-colors">
            Thu nhỏ
          </button>
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={1} margin={{ left: 10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="price"
              type="category"
              width={50}
              tick={{ fill: "hsl(210, 20%, 70%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(215, 25%, 15%)",
                border: "1px solid hsl(215, 20%, 22%)",
                borderRadius: "6px",
                color: "hsl(210, 20%, 90%)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="positive" stackId="a">
              {data.map((_, i) => (
                <Cell key={`pos-${i}`} fill="hsl(220, 70%, 55%)" />
              ))}
            </Bar>
            <Bar dataKey="negative" stackId="a">
              {data.map((_, i) => (
                <Cell key={`neg-${i}`} fill="hsl(0, 65%, 50%)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-1">
        |FOMO| (Absolute Value)
      </p>
      <p className="text-center text-[10px] text-muted-foreground">
        Cuộn để zoom | Kéo để di chuyển | Nhấp đúp để đặt lại
      </p>
    </div>
  );
};

export default FOMOChart;
