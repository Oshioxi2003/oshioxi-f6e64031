import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, FlaskConical, LogOut, Globe } from "lucide-react";

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
    <header className="w-full border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 h-[56px]">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-foreground">Fin</span>
            <span className="text-primary">Shark</span>
          </span>
        </Link>

        {/* Nav tabs */}
        <nav className="flex items-center gap-0.5 bg-secondary/50 rounded-lg p-0.5">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <button
            onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang}
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-border/60" />

          {/* User */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              {initial}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-foreground leading-tight">{userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
