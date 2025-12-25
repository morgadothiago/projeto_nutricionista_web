import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-poppins mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground font-poppins">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium mt-2 font-poppins",
              trend.positive ? "text-primary" : "text-destructive"
            )}>
              {trend.positive ? "+" : ""}{trend.value}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
