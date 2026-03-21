import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <LanguageToggle />

      <div className="finshark-card w-full max-w-md p-8 animate-fade-in">
        <Logo />

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="Enter your password"
              className="finshark-input"
              required
            />
          </div>

          <button type="submit" className="finshark-btn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="finshark-link">
            Register here
          </Link>
        </p>

        <p className="text-center mt-2">
          <Link to="/" className="finshark-link text-sm">
            Back to Chart
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
