import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface DashboardNavbarProps {
  userName?: string;
}

const DashboardNavbar = ({ userName = "User" }: DashboardNavbarProps) => {
  const [lang, setLang] = useState<"EN" | "VI">("VI");
  const location = useLocation();
  const navigate = useNavigate();

  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const tabs = [
    { label: "Biểu đồ", path: "/dashboard" },
    { label: "Phân tích", path: "/analysis" },
  ];

  return (
    <header className="w-full border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <span className="text-xl font-bold">
            <span className="text-foreground">Fin</span>
            <span className="text-primary">Shark</span>
          </span>
        </Link>

        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                location.pathname === tab.path
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex rounded-md overflow-hidden border border-border text-xs">
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1.5 font-medium transition-colors duration-150 ${
                lang === "EN"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("VI")}
              className={`px-3 py-1.5 font-medium transition-colors duration-150 ${
                lang === "VI"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              VI
            </button>
          </div>

          {/* User avatar */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 group"
            title="Đăng xuất"
          >
            <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm">
              {initial}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs text-foreground font-medium leading-tight group-hover:text-primary transition-colors">
                {userName}
              </p>
              <p className="text-[10px] text-muted-foreground">USER</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
