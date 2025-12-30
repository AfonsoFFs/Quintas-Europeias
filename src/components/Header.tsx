import { BarChart3, Calendar, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "stats", label: "Estatísticas", icon: BarChart3 },
    { id: "matches", label: "Jogos", icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="https://quintas-europeias.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img
                src="/quintas_horizontal.png"
                alt="Quintas Europeias"
                className="h-10 w-auto"
              />
            </a>
          </div>


          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu */}
          <nav className="flex md:hidden items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    p-2.5 rounded-lg transition-all duration-200
                    ${activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;