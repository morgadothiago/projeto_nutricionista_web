"use client"

import { useState } from "react"
import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { PeriodTabs } from "@/app/components/dashboard/period-tabs"
import { WeightEvolutionCard } from "@/app/components/dashboard/weight-evolution-card"
import { CaloriesChartCard } from "@/app/components/dashboard/calories-chart-card"
import { useApi } from "@/app/hooks/useApi"
import { getWeightEvolution, getCaloriesEvolution } from "@/app/services/api"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function EvolucaoPage() {
  const { userName } = useRequirePaciente()
  const [period, setPeriod] = useState("30D")

  // Fetch dados da API
  const {
    data: weightEvolutionData,
    loading: loadingWeight,
    refetch: refetchWeight,
  } = useApi<any>(() => getWeightEvolution(period))

  const {
    data: caloriesEvolutionData,
    loading: loadingCalories,
    refetch: refetchCalories,
  } = useApi<any>(() => getCaloriesEvolution(period))

  // Dados padrão
  const weightData = weightEvolutionData?.data || []
  const caloriesData = caloriesEvolutionData?.data || []

  // Calcular estatísticas de peso
  const initialWeight = weightData.length > 0 ? weightData[0].weight : 0
  const currentWeight =
    weightData.length > 0 ? weightData[weightData.length - 1].weight : 0
  const weightLost = currentWeight - initialWeight
  const calorieGoal = caloriesEvolutionData?.goal || 2200

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod)
    // O useApi irá refazer a chamada automaticamente quando period mudar
    setTimeout(() => {
      refetchWeight()
      refetchCalories()
    }, 0)
  }

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">Minha Evolução</h1>
          <p className="text-[#6B7280] mt-2">Acompanhe seu progresso</p>
        </div>

        {/* Period Tabs */}
        <PeriodTabs onChange={handlePeriodChange} />

        {/* Weight Evolution */}
        {loadingWeight ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <WeightEvolutionCard
            initialWeight={initialWeight}
            currentWeight={currentWeight}
            weightLost={weightLost}
            data={weightData}
          />
        )}

        {/* Calories Chart */}
        {loadingCalories ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <CaloriesChartCard data={caloriesData} goal={calorieGoal} />
        )}
      </div>
    </DashboardWrapper>
  )
}
