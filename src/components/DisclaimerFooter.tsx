const DisclaimerFooter = () => (
  <footer className="mt-10 py-6 border-t border-border text-center">
    <p className="text-xs text-destructive font-bold mb-1">
      TUYÊN BỐ MIỄN TRỪ:{" "}
      <span className="font-normal text-muted-foreground">
        Tất cả dữ liệu, chỉ số và trực quan hóa trên trang web này{" "}
      </span>
      <span className="underline text-destructive/80">
        chỉ mang tính chất tham khảo và phục vụ mục đích nghiên cứu
      </span>
      <span className="font-normal text-muted-foreground">.</span>
    </p>
    <p className="text-[11px] text-muted-foreground">
      Website không cung cấp tư vấn đầu tư, khuyến nghị giao dịch hay tín hiệu mua bán bất kỳ công cụ tài chính nào.
    </p>
    <p className="text-[11px] text-muted-foreground">
      Người dùng hoàn toàn tự chịu trách nhiệm về các quyết định của mình.
    </p>
  </footer>
);

export default DisclaimerFooter;
