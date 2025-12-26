"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { QuickAccessCard } from "@/app/components/dashboard/quick-access-card"
import { DailyCaloriesCard } from "@/app/components/dashboard/daily-calories-card"
import { TipOfTheDay } from "@/app/components/dashboard/tip-of-the-day"
import { useApi } from "@/app/hooks/useApi"
import { getDailySummary, getTipOfTheDay } from "@/app/services/api"
import {
  BookOpen,
  UtensilsCrossed,
  TrendingUp,
  ClipboardCheck,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PacienteDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, userRole, userName, userId, isLoading } = useAuthContext()

  // Fetch dados da API
  const {
    data: dailySummary,
    loading: loadingSummary,
    error: errorSummary,
  } = useApi<any>(() => getDailySummary(userId || ""), { skip: !userId })

  const {
    data: tip,
    loading: loadingTip,
    error: errorTip,
  } = useApi<any>(getTipOfTheDay)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (userRole !== "paciente") {
        // Redireciona se não for paciente
        if (userRole === "nutricionista") {
          router.push("/dashboard/nutricionista")
        }
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
      </div>
    )
  }

  if (!isAuthenticated || userRole !== "paciente") {
    return null
  }

  const firstName = userName?.split(" ")[0] || "Usuário"

  // Dados padrão caso a API não esteja disponível
  const defaultData = {
    currentCalories: 0,
    targetCalories: 2200,
    macros: {
      carbs: { current: 0, target: 280 },
      protein: { current: 0, target: 120 },
      fat: { current: 0, target: 70 },
    },
  }

  const dailyData = dailySummary || defaultData
  const tipOfTheDay =
    tip?.tip ||
    "Conecte-se com a API para receber dicas personalizadas do seu nutricionista."

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#2E3A59]">
            Olá, {firstName}!
          </h1>
          <p className="text-[#6B7280] mt-2">Veja seu resumo de hoje</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAccessCard
            title="Diário"
            href="/dashboard/paciente/diario-alimentar"
            icon={BookOpen}
            iconColor="text-[#2DD49F]"
            iconBgColor="bg-[#E6F9F0]"
          />
          <QuickAccessCard
            title="Meu Plano"
            href="/dashboard/paciente/plano-alimentar"
            icon={UtensilsCrossed}
            iconColor="text-[#FF8C42]"
            iconBgColor="bg-[#FFF3E0]"
          />
          <QuickAccessCard
            title="Evolução"
            href="/dashboard/paciente/evolucao"
            icon={TrendingUp}
            iconColor="text-[#4A90E2]"
            iconBgColor="bg-[#E3F2FD]"
          />
          <QuickAccessCard
            title="Check-ins"
            href="/dashboard/paciente/checkins"
            icon={ClipboardCheck}
            iconColor="text-[#9B59B6]"
            iconBgColor="bg-[#F3E5F5]"
          />
        </div>

        {/* Daily Calories Card */}
        {loadingSummary ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <DailyCaloriesCard
            currentCalories={dailyData.currentCalories}
            targetCalories={dailyData.targetCalories}
            macros={dailyData.macros}
          />
        )}

        {/* Tip of the Day */}
        <TipOfTheDay tip={tipOfTheDay} />
      </div>
    </DashboardWrapper>
  )
}
