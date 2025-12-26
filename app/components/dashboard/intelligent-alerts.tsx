import { Card } from "@/components/ui/card"
import { TrendingDown, TrendingUp, AlertTriangle, Calendar, Lightbulb } from "lucide-react"

interface Alert {
  title: string
  count: number
  type: "low-engagement" | "excess-calories" | "goal-not-met" | "no-checkin"
}

interface IntelligentAlertsProps {
  alerts?: Alert[]
}

const iconMap = {
  "low-engagement": TrendingDown,
  "excess-calories": TrendingUp,
  "goal-not-met": AlertTriangle,
  "no-checkin": Calendar,
}

const colorMap = {
  "low-engagement": "bg-[#FF8C42]/10 text-[#FF8C42]",
  "excess-calories": "bg-[#FF6B6B]/10 text-[#FF6B6B]",
  "goal-not-met": "bg-[#FFB84D]/10 text-[#FFB84D]",
  "no-checkin": "bg-[#6B7280]/10 text-[#6B7280]",
}

export function IntelligentAlerts({ alerts = [] }: IntelligentAlertsProps) {
  return (
    <Card className="p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <h3 className="text-xl sm:text-2xl font-bold text-[#2E3A59] mb-6 sm:mb-8">
        Alertas Inteligentes
      </h3>

      {alerts.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#E6F9F0] to-[#D0F5E5] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#2DD49F]" />
          </div>
          <p className="text-[#6B7280] text-sm sm:text-base px-4">
            Nenhum alerta no momento.
            <br />
            Seus pacientes estão indo bem! 🎉
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4">
            {alerts.map((alert, index) => {
              const Icon = iconMap[alert.type]
              const colorClass = colorMap[alert.type]

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${colorClass}`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base text-[#2E3A59] truncate">
                      {alert.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B7280]">
                      {alert.count} {alert.count === 1 ? "paciente" : "pacientes"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dica */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-[#E6F9F0] to-[#D0F5E5]/50 rounded-xl sm:rounded-2xl flex items-start gap-3">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-[#2DD49F] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#2E3A59] leading-relaxed">
              Recomendamos enviar uma mensagem aos pacientes com alertas para entender suas dificuldades.
            </p>
          </div>
        </>
      )}
    </Card>
  )
}
