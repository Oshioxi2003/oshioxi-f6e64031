import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

          <button type="submit" className="finshark-btn">
            Login
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
