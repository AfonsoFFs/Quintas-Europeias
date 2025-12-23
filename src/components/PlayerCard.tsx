import { Trophy, Target, Zap, TrendingUp } from "lucide-react";
import { Player, getWinRate } from "@/data/mockData";

interface PlayerCardProps {
  player: Player;
  rank?: number;
  delay?: number;
}

const PlayerCard = ({ player, rank, delay = 0 }: PlayerCardProps) => {
  const winRate = getWinRate(player);
  
  return (
    <div 
      className="stat-card group hover:scale-[1.02] transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="player-avatar group-hover:border-accent transition-colors duration-300">
              {player.avatar}
            </div>
            <div>
              <h3 className="font-display text-2xl text-foreground tracking-wide">
                {player.nickname}
              </h3>
              <p className="text-muted-foreground text-sm">{player.name}</p>
            </div>
          </div>
          {rank && rank <= 3 && (
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-display text-xl
              ${rank === 1 ? 'bg-accent text-accent-foreground' : ''}
              ${rank === 2 ? 'bg-muted text-foreground' : ''}
              ${rank === 3 ? 'bg-orange-600 text-white' : ''}
            `}>
              {rank}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Target size={14} />
              Golos
            </div>
            <p className="font-display text-2xl text-foreground">{player.goals}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Zap size={14} />
              Assistências
            </div>
            <p className="font-display text-2xl text-foreground">{player.assists}</p>
          </div>
        </div>

        {/* Win Rate Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp size={14} />
              Taxa de Vitória
            </span>
            <span className="text-foreground font-semibold">{winRate}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
              style={{ width: `${winRate}%` }}
            />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-victory">{player.wins}V</span>
            <span className="text-draw">{player.draws}E</span>
            <span className="text-defeat">{player.losses}D</span>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Trophy size={14} />
            <span className="font-semibold">{player.mvpCount} MVP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
