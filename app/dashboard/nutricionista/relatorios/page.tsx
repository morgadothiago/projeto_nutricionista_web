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

  // Dados padrão caso a API não retorne dados
  const defaultEngagementData = {
    data: [],
    weekEngagement: 0,
    engagedPatients: 0,
    totalPatients: 0,
  }

  const engagementData = engagementDataAPI || defaultEngagementData

  const periods: Period[] = ["Semanal", "30 dias", "Mensal", "Personalizado"]

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E3A59] leading-tight">
            Relatórios
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Análise de engajamento dos pacientes
          </p>
        </div>

        {/* Engagement Chart */}
        {loading ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <Card className="p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="space-y-6 sm:space-y-8">
              {/* Header com título e tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#2E3A59]">
                  Engajamento
                </h3>
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                        period === p
                          ? "bg-[#2DD49F] text-white shadow-md scale-105"
                          : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gráfico */}
              <div className="h-64 sm:h-80">
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
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        padding: "12px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Engajamento"]}
                      labelStyle={{ color: "#2E3A59", fontWeight: "bold", marginBottom: "4px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#2DD49F"
                      strokeWidth={3}
                      dot={{ fill: "#2DD49F", r: 5 }}
                      activeDot={{ r: 8, fill: "#1FB87D", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Informações abaixo do gráfico */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-gradient-to-r from-[#E6F9F0]/50 to-[#D0F5E5]/50 rounded-xl sm:rounded-2xl">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                    Engajamento da última semana
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#2DD49F]">
                    {engagementData.weekEngagement}%
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                    Pacientes engajados
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#2E3A59]">
                    {engagementData.engagedPatients}{" "}
                    <span className="text-lg sm:text-xl text-[#6B7280]">
                      de {engagementData.totalPatients}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardWrapper>
  )
}
