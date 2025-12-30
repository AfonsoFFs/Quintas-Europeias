import { useEffect, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { getJogos, getJogadores } from "@/lib/api";
import { Jogo, Jogador } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortKey =
  | "nome"
  | "gamesPlayed"
  | "wins"
  | "draws"
  | "losses"
  | "goals"
  | "winRate"
  | "participation"
  | "points";

type SortOrder = "asc" | "desc";

interface PlayerStats {
  id: number;
  nome: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  points: number;
}

const StatsView = () => {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [matches, setMatches] = useState<Jogo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getJogadores(), getJogos()])
      .then(([jogadores, jogos]) => {
        setMatches(jogos);

        const stats: PlayerStats[] = jogadores.map((jogador: Jogador) => {
          const gamesPlayed = jogos.filter(
            (j) =>
              j.equipa_a.some((p) => p.id === jogador.id) ||
              j.equipa_b.some((p) => p.id === jogador.id)
          ).length;

          const wins = jogos.filter(
            (j) =>
              (j.equipa_a.some((p) => p.id === jogador.id) &&
                j.resultado_a > j.resultado_b) ||
              (j.equipa_b.some((p) => p.id === jogador.id) &&
                j.resultado_b > j.resultado_a)
          ).length;

          const draws = jogos.filter(
            (j) =>
              j.resultado_a === j.resultado_b &&
              (j.equipa_a.some((p) => p.id === jogador.id) ||
                j.equipa_b.some((p) => p.id === jogador.id))
          ).length;

          const losses = gamesPlayed - wins - draws;

          const goals = jogos
            .flatMap((j) => j.golos)
            .filter((g) => g.jogador.id === jogador.id)
            .reduce((acc, g) => acc + g.quantidade, 0);

          return {
            id: jogador.id,
            nome: jogador.nome,
            gamesPlayed,
            wins,
            draws,
            losses,
            goals,
            points: wins * 3 + draws * 1,
          };
        });

        setPlayers(stats);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalGames = matches.length;

  const getWinRate = (p: PlayerStats) =>
    p.gamesPlayed === 0 ? 0 : Math.round((p.wins / p.gamesPlayed) * 100);

  const getParticipation = (p: PlayerStats) =>
    totalGames === 0 ? 0 : Math.round((p.gamesPlayed / totalGames) * 100);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const sortedPlayers = [...players]
    .filter((p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortKey) {
        case "winRate":
          aValue = getWinRate(a);
          bValue = getWinRate(b);
          break;
        case "participation":
          aValue = getParticipation(a);
          bValue = getParticipation(b);
          break;
        default:
          aValue = a[sortKey];
          bValue = b[sortKey];
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  if (loading) return <p>A carregar estatísticas...</p>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <input
          type="text"
          placeholder="Procurar jogador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="stat-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  ["Jogador", "nome"],
                  ["Jogos", "gamesPlayed"],
                  ["V", "wins"],
                  ["E", "draws"],
                  ["D", "losses"],
                  ["Golos", "goals"],
                  ["% Vitória", "winRate"],
                  ["% Participação", "participation"],
                  ["Pontos", "points"],
                ].map(([label, key]) => (
                  <TableHead
                    key={key}
                    onClick={() => handleSort(key as SortKey)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedPlayers.map((p, i) => (
                <TableRow key={p.id} style={{ animationDelay: `${i * 30}ms` }}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell className="text-center">{p.gamesPlayed}</TableCell>
                  <TableCell className="text-center text-victory">{p.wins}</TableCell>
                  <TableCell className="text-center text-draw">{p.draws}</TableCell>
                  <TableCell className="text-center text-defeat">{p.losses}</TableCell>
                  <TableCell className="text-center">{p.goals}</TableCell>
                  <TableCell className="text-center">{getWinRate(p)}%</TableCell>
                  <TableCell className="text-center">{getParticipation(p)}%</TableCell>
                  <TableCell className="text-center">{p.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
