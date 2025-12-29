"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { QuickAccessCard } from "@/app/components/dashboard/quick-access-card"
import { DailyCaloriesCard } from "@/app/components/dashboard/daily-calories-card"
import { TipOfTheDay } from "@/app/components/dashboard/tip-of-the-day"
import { useApi } from "@/app/hooks/useApi"
import { getNutritionalGoals, getTipOfTheDay } from "@/app/services/api"
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

  // Formata a data atual no formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Fetch dados da API
  const {
    data: nutritionalGoals,
    loading: loadingSummary,
    error: errorSummary,
  } = useApi<any>(() => getNutritionalGoals(userId || "", getCurrentDate()), { skip: !userId })

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

  // Transforma os dados da API para o formato esperado pelo componente
  const transformNutritionalData = (data: any) => {
    if (!data) return null

    return {
      currentCalories: data.totals?.calorias || 0,
      targetCalories: data.goals?.calorias || 0,
      macros: {
        carbs: {
          current: data.totals?.carboidratos || 0,
          target: data.goals?.carboidratos || 0
        },
        protein: {
          current: data.totals?.proteinas || 0,
          target: data.goals?.proteinas || 0
        },
        fat: {
          current: data.totals?.gorduras || 0,
          target: data.goals?.gorduras || 0
        },
      },
      fiber: {
        current: data.totals?.fibras || 0,
        target: data.goals?.fibras || 0
      },
      water: {
        current: data.totals?.agua || 0,
        target: data.goals?.agua || 0
      },
      exceeded: data.exceeded
    }
  }

  const dailyData = transformNutritionalData(nutritionalGoals)
  const tipOfTheDay =
    tip?.tip ||
    "Conecte-se com a API para receber dicas personalizadas do seu nutricionista."

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E3A59] leading-tight">
            Olá, {firstName}!
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Veja seu resumo de hoje
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        ) : errorSummary ? (
          <Card className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
                  Erro ao carregar dados
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Não foi possível carregar suas metas nutricionais. Tente novamente mais tarde.
                </p>
              </div>
            </div>
          </Card>
        ) : !dailyData ? (
          <Card className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
                  Nenhum dado disponível
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Suas metas nutricionais ainda não foram configuradas pelo seu nutricionista.
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <DailyCaloriesCard
            currentCalories={dailyData.currentCalories}
            targetCalories={dailyData.targetCalories}
            macros={dailyData.macros}
            fiber={dailyData.fiber}
            water={dailyData.water}
          />
        )}

        {/* Tip of the Day */}
        <TipOfTheDay tip={tipOfTheDay} />
      </div>
    </DashboardWrapper>
  )
}
