import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardNavbar from "@/components/DashboardNavbar";
import AnalysisFilters from "@/components/AnalysisFilters";
import AnalysisResults from "@/components/AnalysisResults";
import DisclaimerFooter from "@/components/DisclaimerFooter";

const Analysis = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

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

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Phân tích xác suất</h1>

        <AnalysisFilters onAnalyze={() => setShowResults(true)} />

        {showResults && <AnalysisResults />}

        <DisclaimerFooter />
      </main>
    </div>
  );
};

export default Analysis;
