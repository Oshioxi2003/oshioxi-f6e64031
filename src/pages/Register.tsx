import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";

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
      toast({
        title: "Lỗi",
        description: "Mật khẩu không khớp",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({
        title: "Đăng ký thất bại",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Đăng ký thành công!",
        description: "Kiểm tra email để xác nhận tài khoản, hoặc đăng nhập ngay.",
      });
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <LanguageToggle />

      <div className="finshark-card w-full max-w-md p-8 animate-fade-in">
        <Logo />
        <p className="text-center text-muted-foreground text-sm mb-6">
          Create your account
        </p>

        <div className="finshark-info-box mb-6">
          <p className="text-primary font-semibold text-sm mb-1">
            30-Day Free Trial
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            After registration, you get full access for 30 days. After trial
            ends, contact admin via Zalo to continue for free.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="finshark-label">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="finshark-input"
              required
            />
          </div>

          <div>
            <label className="finshark-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="finshark-input"
              required
            />
          </div>

          <div>
            <label className="finshark-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="finshark-input"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              At least 6 characters
            </p>
          </div>

          <div>
            <label className="finshark-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="finshark-input"
              required
            />
          </div>

          <button type="submit" className="finshark-btn" disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{" "}
          <Link to="/login" className="finshark-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
