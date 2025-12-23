import MatchCard from "./MatchCard";
import { useEffect, useState } from "react";
import { getJogos } from "@/lib/api";
import { Jogo } from "@/types";

const MatchesView = () => {
  const [matches, setMatches] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJogos()
      .then((jogos: Jogo[]) => setMatches(jogos)) // usamos diretamente o tipo Jogo
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>A carregar jogos...</p>;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="font-display text-3xl">Histórico de Jogos</h2>

      <div className="grid gap-6">
        {matches.map((match, index) => (
          <MatchCard key={match.id} match={match} delay={index * 100} />
        ))}
      </div>
    </div>
  );
};

export default MatchesView;
