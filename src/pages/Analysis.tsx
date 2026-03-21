import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardNavbar from "@/components/DashboardNavbar";
import AnalysisFilters from "@/components/AnalysisFilters";
import AnalysisResults from "@/components/AnalysisResults";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import { FlaskConical } from "lucide-react";

const Analysis = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

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

      <main className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Phân tích <span className="gradient-text">xác suất</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Lọc và phân tích dữ liệu FOMO theo điều kiện</p>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "80ms" }}>
          <AnalysisFilters onAnalyze={() => setShowResults(true)} />
        </div>

        {showResults && <AnalysisResults />}

        <DisclaimerFooter />
      </main>
    </div>
  );
};

export default Analysis;
