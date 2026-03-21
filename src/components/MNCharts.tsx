import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateTimeData = (min: number, max: number, color: string) => {
  const data = [];
  const times = ["00:01:44", "00:41:27", "01:21:49", "02:01:32", "02:41:55", "03:21:37", "04:01:21", "04:41:44", "05:21:27"];
  for (const time of times) {
    data.push({
      time,
      value: +(min + Math.random() * (max - min)).toFixed(4),
    });
  }
  return data;
};

const mData = generateTimeData(-3, 0, "cyan");
const nData = generateTimeData(-0.45, -0.15, "yellow");

const MNCharts = () => {
  const chartTooltipStyle = {
    backgroundColor: "hsl(215, 25%, 15%)",
    border: "1px solid hsl(215, 20%, 22%)",
    borderRadius: "6px",
    color: "hsl(210, 20%, 90%)",
    fontSize: 12,
  };

  return (
    <div>
      {/* M & N Summary */}
      <div className="finshark-card p-6 text-center">
        <div className="flex justify-center gap-16">
          <div>
            <p className="text-sm text-muted-foreground">M (Tổng FOMO)</p>
            <p className="text-3xl font-bold text-primary mt-1">2005.5831</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">N (Trung bình)</p>
            <p className="text-3xl font-bold text-purple-400 mt-1">2.1156</p>
          </div>
        </div>
      </div>

      {/* Chart options */}
      <div className="mt-6">
        <h3 className="text-primary font-bold text-sm mb-3">Tùy chọn biểu đồ M & N</h3>
        <div className="flex gap-2">
          <button className="finshark-btn !w-auto px-5 !py-2 text-sm">
            Chỉ Hôm nay (Reset từ 0)
          </button>
          <button className="finshark-input !w-auto px-5 !py-2 text-sm text-center cursor-pointer hover:bg-secondary transition-colors">
            Tùy chọn khoảng (Tích lũy)
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="text-primary text-sm font-bold text-center mb-3">
            M (Total FOMO) - Today Only
          </h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mData}>
                <XAxis
                  dataKey="time"
                  tick={{ fill: "hsl(210, 20%, 55%)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(210, 20%, 55%)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line
                  type="stepAfter"
                  dataKey="value"
                  stroke="hsl(180, 80%, 55%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-primary text-sm font-bold text-center mb-3">
            N (Average) - Today Only
          </h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={nData}>
                <XAxis
                  dataKey="time"
                  tick={{ fill: "hsl(210, 20%, 55%)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(210, 20%, 55%)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line
                  type="stepAfter"
                  dataKey="value"
                  stroke="hsl(50, 90%, 55%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MNCharts;
