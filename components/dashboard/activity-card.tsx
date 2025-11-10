import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

interface ActivityCardProps {
  activities: Activity[];
  title?: string;
}

export function ActivityCard({ activities, title = "Atividades Recentes" }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div
                className={cn(
                  "p-2 rounded-lg flex-shrink-0",
                  activity.iconBgColor || "bg-gray-100"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    activity.iconColor || "text-gray-600"
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
