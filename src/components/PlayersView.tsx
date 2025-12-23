import { useState } from "react";
import { Search } from "lucide-react";
import PlayerCard from "./PlayerCard";
import { players } from "@/data/mockData";

type SortOption = "goals" | "assists" | "mvpCount" | "wins";

const PlayersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("goals");

  const filteredPlayers = players
    .filter((player) =>
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "goals", label: "Golos" },
    { value: "assists", label: "Assistências" },
    { value: "mvpCount", label: "MVPs" },
    { value: "wins", label: "Vitórias" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Procurar jogador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Sort */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`
                px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                ${sortBy === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player, index) => (
          <PlayerCard
            key={player.id}
            player={player}
            rank={sortBy === "goals" || sortBy === "mvpCount" ? index + 1 : undefined}
            delay={index * 50}
          />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum jogador encontrado
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayersView;
