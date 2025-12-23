import { useEffect, useState } from "react";
import { Target, Trophy, Users, Calendar } from "lucide-react";

import StatCard from "./StatCard";
import LeaderboardCard from "./LeaderboardCard";
import { Jogo, Player } from "@/types";
import { getJogos, getJogadores } from "@/lib/api";

const Dashboard = () => {
  const [matches, setMatches] = useState<Jogo[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getJogos(), getJogadores()]).then(([jogos, jogadores]) => {
      setMatches(jogos);

      const playersWithStats: Player[] = jogadores.map((j) => {
        const goals = jogos
          .flatMap((jogo) =>
            jogo.golos.filter((g) => g.jogador.id === j.id).map((g) => g.quantidade)
          )
          .reduce((a, b) => a + b, 0);

        const wins = jogos.filter(
          (jogo) =>
            (jogo.equipa_a.some((p) => p.id === j.id) && jogo.resultado_a > jogo.resultado_b) ||
            (jogo.equipa_b.some((p) => p.id === j.id) && jogo.resultado_b > jogo.resultado_a)
        ).length;

        return {
          ...j,
          goals,
          wins,
        };
      });

      setPlayers(playersWithStats);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>A carregar dashboard...</p>;

  const totalGames = matches.length;
  const totalGoals = matches.reduce((acc, jogo) => acc + jogo.resultado_a + jogo.resultado_b, 0);
  const avgGoalsPerGame = totalGames > 0 ? (totalGoals / totalGames).toFixed(1) : "0";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total de Jogos" value={totalGames} subtitle="Esta temporada" icon={Calendar} delay={0} />
        <StatCard title="Total de Golos" value={totalGoals} subtitle={`${avgGoalsPerGame} por jogo`} icon={Target} delay={100} />
        <StatCard title="Jogadores Ativos" value={players.length} subtitle="Esta temporada" icon={Users} delay={200} />
      </div>

      {/* Leaderboards */}
      <div className="grid md:grid-cols-2 gap-6">
        <LeaderboardCard 
          title="Top Marcadores" 
          icon={Target} 
          players={[...players].sort((a,b)=>b.goals-a.goals).slice(0,5)} 
          statKey="goals" 
        />
        <LeaderboardCard 
          title="Top Vitórias" 
          icon={Trophy} 
          players={[...players].sort((a,b)=>b.wins-a.wins).slice(0,5)} 
          statKey="wins" 
        />
      </div>

      {/* Últimos Resultados */}
      <div className="stat-card">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users size={20} />
            </div>
            <h3 className="font-display text-xl text-foreground">Últimos Resultados</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {matches.slice(0, 5).map((match, index) => (
              <div 
                key={match.id} 
                className={`px-4 py-3 rounded-xl text-center min-w-[80px] border 
                  ${match.resultado_a===match.resultado_b?'bg-draw/10 border-draw/30':''} 
                  ${match.resultado_a>match.resultado_b?'bg-victory/10 border-victory/30':''} 
                  ${match.resultado_a<match.resultado_b?'bg-victory/10 border-victory/30':''}`} 
                style={{animationDelay:`${index*100}ms`}}
              >
                <p className="font-display text-2xl text-foreground">{match.resultado_a} - {match.resultado_b}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(match.data).toLocaleDateString("pt-PT")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
