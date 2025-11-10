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
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-emerald-600",
  iconBgColor = "bg-emerald-100",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconBgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
