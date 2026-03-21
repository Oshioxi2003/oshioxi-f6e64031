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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardNavbar userName={userName} />

      <main className="max-w-[1440px] mx-auto px-5 py-5 space-y-4">
        {/* Header row */}
        <div className="flex items-end justify-between animate-fade-in">
          <div>
            <h1 className="text-xl font-bold text-foreground">FOMO Index</h1>
            <p className="text-xs text-muted-foreground mt-0.5">XAU/USD · Thời gian thực</p>
          </div>
          <StatusCards />
        </div>

        {/* Time filter */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TimeFilter />
        </div>

        {/* FOMO bar chart */}
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <FOMOChart />
        </div>

        {/* M & N */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <MNCharts />
        </div>

        {/* Bottom: streak + recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="finshark-card p-4">
            <StreakCounter />
          </div>
          <div className="finshark-card p-4">
            <RecentDataTable />
          </div>
        </div>

        <DisclaimerFooter />
      </main>
    </div>
  );
};

export default Dashboard;
