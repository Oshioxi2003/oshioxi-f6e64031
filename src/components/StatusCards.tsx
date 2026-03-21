const StatusCards = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      <div className="finshark-card px-8 py-4 text-center min-w-[160px]">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Trạng thái</p>
        <p className="text-lg font-bold text-green-400">Ready</p>
      </div>
      <div className="finshark-card px-8 py-4 text-center min-w-[200px]">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Cập nhật (VN)</p>
        <p className="text-lg font-bold text-foreground">2026-03-21 05:56:26</p>
      </div>
      <div className="finshark-card px-8 py-4 text-center min-w-[160px]">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Luồng dữ liệu</p>
        <p className="text-lg font-bold text-primary">Hoạt động</p>
      </div>
    </div>
  );
};

export default StatusCards;
