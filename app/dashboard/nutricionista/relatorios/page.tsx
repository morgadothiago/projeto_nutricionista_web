"use client"

import { useState } from "react"
import { useRequireNutricionista } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useApi } from "@/app/hooks/useApi"
import { getEngagementData } from "@/app/services/api"
import { Loader2 } from "lucide-react"

type Period = "Semanal" | "30 dias" | "Mensal" | "Personalizado"

export default function RelatoriosPage() {
  useRequireNutricionista()

  const [period, setPeriod] = useState<Period>("Semanal")

  // Fetch dados de engajamento
  const { data: engagementDataAPI, loading } = useApi<any>(() => getEngagementData(period))

  // Dados mockados
  const mockEngagementData = {
    data: [
      { week: "Sem 1", engagement: 65 },
      { week: "Sem 2", engagement: 72 },
      { week: "Sem 3", engagement: 68 },
      { week: "Sem 4", engagement: 78 },
      { week: "Sem 5", engagement: 80 },
      { week: "Sem 6", engagement: 75 },
    ],
    weekEngagement: 75,
    engagedPatients: 18,
    totalPatients: 24,
  }

  const engagementData = engagementDataAPI || mockEngagementData

  const periods: Period[] = ["Semanal", "30 dias", "Mensal", "Personalizado"]

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#2E3A59]">Relatórios</h1>
          <p className="text-[#6B7280] mt-2">Análise de engajamento dos pacientes</p>
        </div>

        {/* Engagement Chart */}
        {loading ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <Card className="p-6 border border-gray-100">
            <div className="space-y-6">
              {/* Header com título e tabs */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#2E3A59]">Engajamento</h3>
                <div className="flex gap-2">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        period === p
                          ? "bg-[#2DD49F] text-white"
                          : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gráfico */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                      dataKey="week"
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Engajamento"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#2DD49F"
                      strokeWidth={3}
                      dot={{ fill: "#2DD49F", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Informações abaixo do gráfico */}
              <div className="flex items-center gap-8 text-sm text-[#6B7280]">
                <p>
                  Engajamento da última semana:{" "}
                  <span className="font-bold text-[#2E3A59]">{engagementData.weekEngagement}%</span>
                </p>
                <p>
                  Pacientes engajados:{" "}
                  <span className="font-bold text-[#2E3A59]">
                    {engagementData.engagedPatients} de {engagementData.totalPatients}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardWrapper>
  )
}
