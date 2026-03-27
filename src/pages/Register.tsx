import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/integrations/auth/client";
import LanguageToggle from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight, Gift } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Lỗi", description: "Mật khẩu không khớp", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Lỗi", description: "Mật khẩu ít nhất 6 ký tự", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await authApi.register(email, password, fullName);
    if (error) {
      toast({ title: "Đăng ký thất bại", description: error, variant: "destructive" });
    } else {
      toast({ title: "Thành công!", description: "Đăng nhập ngay bây giờ." });
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <LanguageToggle />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="finshark-card w-full max-w-[420px] p-8 animate-fade-in relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-foreground">Fin</span>
            <span className="gradient-text">Shark</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Tạo tài khoản mới</p>
        </div>

        {/* Trial banner */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Gift className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-primary">Dùng thử 30 ngày miễn phí</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              Truy cập đầy đủ tính năng. Sau khi kết thúc, liên hệ admin qua Zalo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="finshark-label">Họ tên</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" className="finshark-input !pl-10" required />
            </div>
          </div>
          <div>
            <label className="finshark-label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="finshark-input !pl-10" required />
            </div>
          </div>
          <div>
            <label className="finshark-label">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự" className="finshark-input !pl-10" required />
            </div>
          </div>
          <div>
            <label className="finshark-label">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" className="finshark-input !pl-10" required />
            </div>
          </div>
          <button type="submit" className="finshark-btn flex items-center justify-center gap-2" disabled={loading}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Tạo tài khoản
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="finshark-link font-semibold">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
