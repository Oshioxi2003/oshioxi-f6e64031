import { useState } from "react";

const TimeFilter = () => {
  const [startDate, setStartDate] = useState("2026-03-15T00:00");
  const [endDate, setEndDate] = useState("");
  const [realtime, setRealtime] = useState(true);

  return (
    <div className="finshark-card p-5 mt-6">
      <h3 className="text-primary font-bold text-sm mb-4">
        Bộ lọc thời gian (GMT+7 - Việt Nam)
      </h3>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">BẮT ĐẦU (VN)</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="finshark-input text-sm !py-2 !w-auto"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">KẾT THÚC (VN)</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={realtime}
            className="finshark-input text-sm !py-2 !w-auto disabled:opacity-40"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={realtime}
            onChange={(e) => setRealtime(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          Chế độ thời gian thực (tự động cập nhật)
        </label>
        <button className="finshark-btn !w-auto !py-2 px-6 text-sm">Áp dụng</button>
        <button className="finshark-input !w-auto !py-2 px-4 text-sm text-center hover:bg-secondary transition-colors cursor-pointer">
          Đặt lại
        </button>
        <button className="finshark-input !w-auto !py-2 px-4 text-sm text-center text-primary hover:bg-secondary transition-colors cursor-pointer">
          Xem Hôm nay
        </button>
      </div>

      <p className="text-xs text-primary mt-3">
        Tổng bản ghi: <span className="text-foreground">1441</span> | Đã lọc:{" "}
        <span className="text-foreground">1441</span> | Khoảng dữ liệu:{" "}
        <span className="text-foreground">2026-01-12 07:01:22 → 2026-03-21 05:56:26</span>
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        Mẹo: Bỏ chọn Chế độ thời gian thực để chọn thời gian kết thúc
      </p>
    </div>
  );
};

export default TimeFilter;
