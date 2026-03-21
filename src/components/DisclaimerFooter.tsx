import { AlertTriangle } from "lucide-react";

const DisclaimerFooter = () => (
  <footer className="mt-10 pt-6 pb-4 border-t border-border/30">
    <div className="flex items-center gap-3 max-w-xl mx-auto bg-secondary/20 rounded-2xl border border-border/20 px-5 py-3">
      <AlertTriangle className="w-4 h-4 text-warning/60 shrink-0" />
      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
        Dữ liệu chỉ mang tính chất tham khảo. Không cung cấp tư vấn đầu tư hay khuyến nghị giao dịch.
      </p>
    </div>
  </footer>
);

export default DisclaimerFooter;
