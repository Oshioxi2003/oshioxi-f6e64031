import { AlertTriangle } from "lucide-react";

const DisclaimerFooter = () => (
  <footer className="mt-8 py-5 border-t border-border/40">
    <div className="flex items-start gap-2.5 max-w-2xl mx-auto">
      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      <div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <span className="text-warning font-medium">Tuyên bố miễn trừ:</span>{" "}
          Tất cả dữ liệu và trực quan hóa trên trang này chỉ mang tính chất tham khảo.
          Website không cung cấp tư vấn đầu tư hay khuyến nghị giao dịch.
        </p>
      </div>
    </div>
  </footer>
);

export default DisclaimerFooter;
