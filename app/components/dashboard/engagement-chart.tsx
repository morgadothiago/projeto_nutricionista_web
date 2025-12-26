"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity } from "lucide-react"

interface EngagementChartProps {
  data?: Array<{ week: string; engagement: number }>
  weekEngagement?: number
  engagedPatients?: number
  totalPatients?: number
}

export function EngagementChart({
  data = [],
  weekEngagement = 0,
  engagedPatients = 0,
  totalPatients = 0,
}: EngagementChartProps) {
  const [period, setPeriod] = useState("Semanal")

  const periods = ["Semanal", "30 dias", "Mensal", "Personalizado"]

  // Verifica se há dados válidos
  const hasData = data.length > 0 && data.some(item => item.engagement > 0)

  return (
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

        {/* Gráfico ou Empty State */}
        {!hasData ? (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#E6F9F0] rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-[#2DD49F]" />
            </div>
            <p className="text-[#6B7280] text-sm">
              Nenhum dado de engajamento disponível ainda.<br />
              Os dados aparecerão quando os pacientes começarem a usar o aplicativo.
            </p>
          </div>
        ) : (
          <>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
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
                <span className="font-bold text-[#2E3A59]">{weekEngagement}%</span>
              </p>
              <p>
                Pacientes engajados:{" "}
                <span className="font-bold text-[#2E3A59]">
                  {engagedPatients} de {totalPatients}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
