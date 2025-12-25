import { LucideIcon } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

interface ActivityCardProps {
  activities: Activity[];
  title?: string;
}

export function ActivityCard({ activities, title = "Atividades Recentes" }: ActivityCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/20 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground font-poppins">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground font-poppins mt-0.5">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/70 font-poppins mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
