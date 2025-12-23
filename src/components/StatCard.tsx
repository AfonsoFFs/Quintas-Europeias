import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  highlight?: boolean;
  delay?: number;
}

const StatCard = ({ title, value, subtitle, icon: Icon, highlight = false, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className={`
        stat-card group cursor-default
        ${highlight ? 'ring-2 ring-accent/50' : ''}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
            ${highlight 
              ? 'bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground' 
              : 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            }
          `}>
            <Icon size={24} />
          </div>
          {highlight && (
            <span className="gold-badge text-xs">TOP</span>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className={`
          font-display text-4xl md:text-5xl tracking-tight
          ${highlight ? 'text-gradient-gold' : 'text-foreground'}
        `}>
          {value}
        </p>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
