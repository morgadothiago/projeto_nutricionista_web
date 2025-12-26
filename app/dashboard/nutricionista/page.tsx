"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { StatCardNutricionista } from "@/app/components/dashboard/stat-card-nutricionista"
import { EngagementChart } from "@/app/components/dashboard/engagement-chart"
import { IntelligentAlerts } from "@/app/components/dashboard/intelligent-alerts"
import { useApi } from "@/app/hooks/useApi"
import { getNutricionistaDashboardStats, getEngagementData, getIntelligentAlerts } from "@/app/services/api"
import { Users, Activity, ClipboardCheck, AlertCircle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function NutricionistaDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuthContext()
  const [period, setPeriod] = useState("weekly")

  // Fetch dados da API
  const {
    data: statsData,
    loading: loadingStats,
    error: errorStats,
  } = useApi<any>(getNutricionistaDashboardStats)

  const {
    data: engagementDataAPI,
    loading: loadingEngagement,
    refetch: refetchEngagement,
  } = useApi<any>(() => getEngagementData(period))

  const {
    data: alertsDataAPI,
    loading: loadingAlerts,
  } = useApi<any>(getIntelligentAlerts)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (userRole !== "nutricionista") {
        if (userRole === "paciente") {
          router.push("/dashboard/paciente")
        }
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])

  // Removido o useEffect que causava loop infinito
  // O período não está sendo usado no momento porque a API não suporta

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
      </div>
    )
  }

  if (!isAuthenticated || userRole !== "nutricionista") {
    return null
  }

  // Dados padrão caso a API não esteja disponível
  const defaultStatsData = {
    activePacients: 0,
    pacientChange: "+0% vs mês anterior",
    weekEngagement: 0,
    engagementChange: "+0% vs semana anterior",
    recentCheckins: 0,
    checkinsChange: "0% vs semana anterior",
    pendingAlerts: 0,
  }

  const defaultEngagementData = [
    { week: "Sem 1", engagement: 0 },
    { week: "Sem 2", engagement: 0 },
    { week: "Sem 3", engagement: 0 },
    { week: "Sem 4", engagement: 0 },
    { week: "Sem 5", engagement: 0 },
    { week: "Sem 6", engagement: 0 },
  ]

  const defaultAlertsData: Array<{
    title: string
    count: number
    type: "low-engagement" | "excess-calories" | "goal-not-met" | "no-checkin"
  }> = []

  // Mapear dados da API para o formato esperado
  const stats = statsData ? {
    activePacients: statsData.activePatients || 0,
    pacientChange: "+0% vs mês anterior",
    weekEngagement: 0,
    engagementChange: "+0% vs semana anterior",
    recentCheckins: 0,
    checkinsChange: "0% vs semana anterior",
    pendingAlerts: 0,
  } : defaultStatsData

  const engagementData = engagementDataAPI?.data || defaultEngagementData
  const alertsData = alertsDataAPI?.alerts || defaultAlertsData
  const weekEngagement = engagementDataAPI?.weekEngagement || 0
  const engagedPatients = engagementDataAPI?.engagedPatients || 0
  const totalPatients = stats.activePacients || 0

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#2E3A59]">Dashboard</h1>
          <p className="text-[#6B7280] mt-2">Visão geral dos seus pacientes</p>
        </div>

        {/* Stats Cards */}
        {loadingStats ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCardNutricionista
              title="Pacientes ativos"
              value={stats.activePacients}
              change={stats.pacientChange}
              changeType="positive"
              icon={Users}
            />
            <StatCardNutricionista
              title="Engajamento da semana"
              value={`${stats.weekEngagement}%`}
              change={stats.engagementChange}
              changeType="positive"
              icon={Activity}
            />
            <StatCardNutricionista
              title="Últimos check-ins"
              value={stats.recentCheckins}
              change={stats.checkinsChange}
              changeType="negative"
              icon={ClipboardCheck}
            />
            <StatCardNutricionista
              title="Alertas pendentes"
              value={stats.pendingAlerts}
              icon={AlertCircle}
            />
          </div>
        )}

        {/* Engagement Chart & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loadingEngagement ? (
              <Card className="p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
              </Card>
            ) : (
              <EngagementChart
                data={engagementData}
                weekEngagement={weekEngagement}
                engagedPatients={engagedPatients}
                totalPatients={totalPatients}
              />
            )}
          </div>
          <div>
            {loadingAlerts ? (
              <Card className="p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
              </Card>
            ) : (
              <IntelligentAlerts alerts={alertsData} />
            )}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
