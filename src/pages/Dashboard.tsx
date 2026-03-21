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
      if (!session) {
        navigate("/login");
        return;
      }
      setUserName(session.user.email?.split("@")[0] || "User");
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
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

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Biểu đồ FOMO Index</h1>
          <p className="text-sm text-muted-foreground mt-1">
            XAU/USD - Trực quan hóa chỉ số thị trường theo thời gian thực
          </p>
        </div>

        {/* Status cards */}
        <StatusCards />

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm" style={{ backgroundColor: "hsl(220, 70%, 55%)" }} />
            <span className="text-xs text-foreground">Tích cực (+)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm" style={{ backgroundColor: "hsl(0, 65%, 50%)" }} />
            <span className="text-xs text-foreground">Tiêu cực (-)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm bg-muted" />
            <span className="text-xs text-foreground">Trung lập (0)</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2 italic">
          Các chỉ số chỉ mô tả trạng thái thị trường, không phải hướng dẫn giao dịch.
        </p>

        {/* Time filter */}
        <TimeFilter />

        {/* FOMO bar chart */}
        <FOMOChart />

        {/* M & N section */}
        <div className="mt-8">
          <MNCharts />
        </div>

        {/* Bottom section: streak + recent data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
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
