import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardNutricionistaProps {
  title: string
  value: number | string
  change?: string
  changeType?: "positive" | "negative"
  icon: LucideIcon
}

const iconColors = [
  "bg-gradient-to-br from-[#2DD49F] to-[#1FB87D]",
  "bg-gradient-to-br from-[#4A90E2] to-[#357ABD]",
  "bg-gradient-to-br from-[#FF8C42] to-[#E67830]",
  "bg-gradient-to-br from-[#9B59B6] to-[#8E44AD]",
]

let iconColorIndex = 0

export function StatCardNutricionista({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
}: StatCardNutricionistaProps) {
  const iconColor = iconColors[iconColorIndex % iconColors.length]
  iconColorIndex++

  return (
    <Card className="p-6 sm:p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white group">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
          <p className="text-sm sm:text-base font-medium text-[#6B7280]">{title}</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E3A59] truncate">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-xs sm:text-sm font-semibold flex items-center gap-1",
                changeType === "positive" ? "text-[#2DD49F]" : "text-[#FF8C42]"
              )}
            >
              {changeType === "positive" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
            iconColor
          )}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>
    </Card>
  )
}

// Reset index para cada renderização
if (typeof window !== "undefined") {
  iconColorIndex = 0
}
