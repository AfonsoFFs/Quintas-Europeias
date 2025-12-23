import { LucideIcon } from "lucide-react";
import { Player } from "@/types"; 

interface LeaderboardCardProps {
  title: string;
  icon: LucideIcon;
  players: Player[];
  statKey: "goals" | "wins";
}

const LeaderboardCard = ({ title, icon: Icon, players, statKey }: LeaderboardCardProps) => {
  return (
    <div className="stat-card animate-slide-up">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={20} />
          </div>
          <h3 className="font-display text-xl text-foreground">{title}</h3>
        </div>

        <div className="space-y-3">
          {players.map((player, index) => (
            <div 
              key={player.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${index === 0 ? 'bg-primary text-primary-foreground' : ''}
                ${index === 1 ? 'bg-muted-foreground/20 text-foreground' : ''}
                ${index === 2 ? 'bg-accent/20 text-accent' : ''}
                ${index > 2 ? 'bg-muted text-muted-foreground' : ''}
              `}>
                {index + 1}
              </div>
              
              <div className="player-avatar">{player.nome.charAt(0)}</div>
              
              <div className="flex-1">
                <p className="font-medium text-foreground">{player.nome}</p>
              </div>
              
              <div className="text-right">
                <p className="font-display text-2xl text-foreground">{player[statKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
