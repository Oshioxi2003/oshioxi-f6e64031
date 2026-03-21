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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardNavbar userName={userName} />

      <main className="max-w-[1440px] mx-auto px-5 py-5">
        <div className="flex items-center gap-2.5 mb-5 animate-fade-in">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <FlaskConical className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Phân tích xác suất</h1>
            <p className="text-xs text-muted-foreground">Lọc và phân tích dữ liệu FOMO theo điều kiện</p>
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
