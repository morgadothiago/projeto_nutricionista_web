import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardNutricionistaProps {
  title: string
  value: number | string
  change?: string
  changeType?: "positive" | "negative"
  icon: LucideIcon
}

export function StatCardNutricionista({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
}: StatCardNutricionistaProps) {
  return (
    <Card className="p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-[#6B7280]">{title}</p>
          <p className="text-4xl font-bold text-[#2E3A59]">{value}</p>
          {change && (
            <p
              className={`text-sm font-medium ${
                changeType === "positive" ? "text-[#2DD49F]" : "text-[#FF8C42]"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="w-14 h-14 bg-[#2DD49F] rounded-2xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </Card>
  )
}
