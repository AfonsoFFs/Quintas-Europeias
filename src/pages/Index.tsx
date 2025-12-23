import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import StatsView from "@/components/StatsView";
import MatchesView from "@/components/MatchesView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "stats" && <StatsView />}
        {activeTab === "matches" && <MatchesView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Quintas Europeias • Todos os direitos reservados ⚽
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;