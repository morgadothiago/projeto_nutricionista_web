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
    <Card className="p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-[#2E3A59] mb-6">Alertas Inteligentes</h3>

      {alerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#E6F9F0] rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-[#2DD49F]" />
          </div>
          <p className="text-[#6B7280] text-sm">
            Nenhum alerta no momento. Seus pacientes estão indo bem!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = iconMap[alert.type]
              const colorClass = colorMap[alert.type]

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#2E3A59]">{alert.title}</p>
                    <p className="text-sm text-[#6B7280]">
                      {alert.count} {alert.count === 1 ? "paciente" : "pacientes"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dica */}
          <div className="mt-6 p-4 bg-[#E6F9F0] rounded-xl flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#2DD49F] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#2E3A59]">
              Recomendamos enviar uma mensagem aos pacientes com alertas para entender suas dificuldades.
            </p>
          </div>
        </>
      )}
    </Card>
  )
}
