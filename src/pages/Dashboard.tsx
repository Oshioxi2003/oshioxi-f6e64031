import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardNavbar from "@/components/DashboardNavbar";
import StatusCards from "@/components/StatusCards";
import TimeFilter from "@/components/TimeFilter";
import FOMOChart from "@/components/FOMOChart";
import MNCharts from "@/components/MNCharts";
import StreakCounter from "@/components/StreakCounter";
import RecentDataTable from "@/components/RecentDataTable";
import DisclaimerFooter from "@/components/DisclaimerFooter";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.email?.split("@")[0] || "User");
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-xs text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardNavbar userName={userName} />

      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              FOMO <span className="gradient-text">Index</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">XAU/USD · Trực quan hóa thời gian thực</p>
          </div>
          <StatusCards />
        </div>

        {/* Time filter */}
        <div className="animate-fade-in" style={{ animationDelay: "80ms" }}>
          <TimeFilter />
        </div>

        {/* FOMO chart */}
        <div className="animate-fade-in" style={{ animationDelay: "140ms" }}>
          <FOMOChart />
        </div>

        {/* M & N */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <MNCharts />
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "260ms" }}>
          <div className="finshark-card p-5">
            <StreakCounter />
          </div>
          <div className="finshark-card p-5">
            <RecentDataTable />
          </div>
        </div>

        <DisclaimerFooter />
      </main>
    </div>
  );
};

export default Dashboard;
