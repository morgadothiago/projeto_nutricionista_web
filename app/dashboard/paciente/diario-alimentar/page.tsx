"use client"

import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { DailyCaloriesCard } from "@/app/components/dashboard/daily-calories-card"
import { MealCard } from "@/app/components/dashboard/meal-card"
import { useApi } from "@/app/hooks/useApi"
import { getDailySummary, getMeals } from "@/app/services/api"
import { Loader2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function DiarioAlimentarPage() {
  const { userName, userId } = useRequirePaciente()

  // Fetch dados da API
  const {
    data: dailySummary,
    loading: loadingSummary,
    error: errorSummary,
  } = useApi<any>(() => getDailySummary(userId || ""), { skip: !userId })

  const {
    data: mealsData,
    loading: loadingMeals,
    error: errorMeals,
  } = useApi<any>(getMeals)

  // Função para formatar a data
  const getCurrentDate = () => {
    const days = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ]
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]

    const now = new Date()
    const dayName = days[now.getDay()]
    const day = now.getDate()
    const month = months[now.getMonth()]

    return `${dayName}, ${day} de ${month}`
  }

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
  const meals = mealsData || []

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">
            Diário Alimentar
          </h1>
          <p className="text-[#6B7280] mt-2">{getCurrentDate()}</p>
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

        {/* Meals Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#2E3A59]">
            Refeições registradas
          </h2>

          {loadingMeals ? (
            <Card className="p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
            </Card>
          ) : errorMeals ? (
            <Card className="p-6 bg-[#FFF3E0] border-[#FF8C42]">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#FF8C42]" />
                <div>
                  <p className="font-semibold text-[#2E3A59]">
                    Erro ao carregar refeições
                  </p>
                  <p className="text-sm text-[#6B7280]">{errorMeals}</p>
                </div>
              </div>
            </Card>
          ) : meals.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-[#6B7280]">
                  Nenhuma refeição registrada hoje. Comece registrando sua
                  primeira refeição!
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {meals.map((meal: any, index: number) => (
                <MealCard
                  key={index}
                  time={meal.time}
                  name={meal.name}
                  foodCount={meal.foodCount}
                  calories={meal.calories}
                  foods={meal.foods}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  )
}
