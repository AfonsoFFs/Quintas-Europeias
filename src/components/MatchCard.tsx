import { Jogo } from "@/types";
import { Calendar, Trophy } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface MatchCardProps {
  match: Jogo;
  delay?: number;
}

const MatchCard = ({ match, delay = 0 }: MatchCardProps) => {
  const isDraw = match.resultado_a === match.resultado_b;
  const teamAWon = match.resultado_a > match.resultado_b;

  return (
    <div
      className="stat-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        {/* Data */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <Calendar size={14} />
          {format(new Date(match.data), "EEEE, d 'de' MMMM", { locale: pt })}
        </div>

        {/* Resultado */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Equipa A */}
          <div className={`flex-1 text-center ${teamAWon ? "" : "opacity-70"}`}>
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {match.equipa_a.map((player) => (
                <span
                  key={player.id}
                  className="px-2 py-1 bg-muted rounded text-xs text-foreground"
                >
                  {player.nome}
                </span>
              ))}
            </div>

            <span
              className={`font-display text-5xl md:text-6xl ${
                teamAWon
                  ? "text-victory"
                  : isDraw
                  ? "text-draw"
                  : "text-muted-foreground"
              }`}
            >
              {match.resultado_a}
            </span>
          </div>

          {/* VS */}
          <div className="text-muted-foreground font-display text-xl">VS</div>

          {/* Equipa B */}
          <div
            className={`flex-1 text-center ${
              !teamAWon && !isDraw ? "" : "opacity-70"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {match.equipa_b.map((player) => (
                <span
                  key={player.id}
                  className="px-2 py-1 bg-muted rounded text-xs text-foreground"
                >
                  {player.nome}
                </span>
              ))}
            </div>

            <span
              className={`font-display text-5xl md:text-6xl ${
                !teamAWon && !isDraw
                  ? "text-victory"
                  : isDraw
                  ? "text-draw"
                  : "text-muted-foreground"
              }`}
            >
              {match.resultado_b}
            </span>
          </div>
        </div>

        {/* Marcadores */}
        <div className="border-t border-border pt-4">
          <p className="text-muted-foreground text-xs mb-2 flex items-center gap-1">
            <Trophy size={12} /> Marcadores
          </p>

          <div className="flex flex-wrap gap-2">
            {match.golos.length > 0 ? (
              match.golos.map((golo, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {golo.jogador.nome} ({golo.quantidade})
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Sem golos registados
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
