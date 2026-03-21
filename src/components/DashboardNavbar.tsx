import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, FlaskConical, LogOut, ChevronDown } from "lucide-react";

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
    { label: "Biểu đồ", path: "/dashboard", icon: BarChart3 },
    { label: "Phân tích", path: "/analysis", icon: FlaskConical },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="border-b border-border/40 bg-background/70 backdrop-blur-2xl">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 h-[60px]">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
              <BarChart3 className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-foreground">Fin</span>
              <span className="gradient-text">Shark</span>
            </span>
          </Link>

          {/* Nav tabs — pill style */}
          <nav className="flex items-center rounded-2xl bg-secondary/40 border border-border/30 p-1">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-250 ${
                    isActive
                      ? "bg-card text-foreground shadow-md shadow-black/15 border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <button
              onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            >
              🌐 {lang}
            </button>

            {/* User pill */}
            <div className="flex items-center gap-0.5 bg-secondary/40 border border-border/30 rounded-2xl pl-1 pr-1 py-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                {initial}
              </div>
              <div className="hidden sm:block px-2">
                <p className="text-xs font-semibold text-foreground leading-tight">{userName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                title="Đăng xuất"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
