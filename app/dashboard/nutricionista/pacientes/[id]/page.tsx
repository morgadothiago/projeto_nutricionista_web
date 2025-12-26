"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireNutricionista } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { DailyCaloriesCard } from "@/app/components/dashboard/daily-calories-card"
import { MealCard } from "@/app/components/dashboard/meal-card"
import { WeightEvolutionCard } from "@/app/components/dashboard/weight-evolution-card"
import { useApi } from "@/app/hooks/useApi"
import { getPatient, getMeals, getWeightEvolution } from "@/app/services/api"
import { ArrowLeft, BookOpen, UtensilsCrossed, TrendingUp, FileText, ClipboardCheck, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type Tab = "diario" | "plano" | "evolucao" | "relatorio" | "checkins"

export default function PatientDetailsPage() {
  useRequireNutricionista()

  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const [activeTab, setActiveTab] = useState<Tab>("diario")

  // Fetch dados do paciente
  const { data: patientData, loading: loadingPatient } = useApi<any>(() => getPatient(patientId))
  const { data: mealsData, loading: loadingMeals } = useApi<any>(getMeals)
  const { data: weightData, loading: loadingWeight } = useApi<any>(() => getWeightEvolution())

  // Dados mockados
  const mockPatient = {
    name: "Maria Silva",
    age: 32,
    goal: "Emagrecimento",
  }

  const mockMeals = [
    {
      time: "07:00",
      name: "Café da manhã",
      foodCount: 4,
      calories: 450,
      foods: [
        {
          name: "Pão integral",
          portion: "2 fatias (50g)",
          carbs: 22,
          protein: 4,
          fat: 1,
          calories: 120,
        },
        {
          name: "Ovo mexido",
          portion: "2 unidades",
          carbs: 1,
          protein: 12,
          fat: 14,
          calories: 180,
        },
        {
          name: "Suco de laranja",
          portion: "200ml",
          carbs: 21,
          protein: 1,
          fat: 0,
          calories: 90,
        },
        {
          name: "Queijo cottage",
          portion: "30g",
          carbs: 1,
          protein: 7,
          fat: 3,
          calories: 60,
        },
      ],
    },
    {
      time: "12:30",
      name: "Almoço",
      foodCount: 5,
      calories: 720,
      foods: [
        {
          name: "Arroz integral",
          portion: "4 colheres (100g)",
          carbs: 23,
          protein: 3,
          fat: 1,
          calories: 112,
        },
        {
          name: "Feijão preto",
          portion: "1 concha (86g)",
          carbs: 14,
          protein: 5,
          fat: 0,
          calories: 77,
        },
        {
          name: "Peito de frango grelhado",
          portion: "150g",
          carbs: 0,
          protein: 47,
          fat: 4,
          calories: 231,
        },
        {
          name: "Salada verde",
          portion: "1 prato",
          carbs: 5,
          protein: 2,
          fat: 7,
          calories: 90,
        },
        {
          name: "Batata doce",
          portion: "1 unidade média (150g)",
          carbs: 30,
          protein: 2,
          fat: 0,
          calories: 130,
        },
      ],
    },
  ]

  const mockWeightData = [
    { date: "01/11", weight: 72.5 },
    { date: "08/11", weight: 72.0 },
    { date: "15/11", weight: 71.5 },
    { date: "22/11", weight: 71.2 },
    { date: "29/11", weight: 71.0 },
    { date: "06/12", weight: 70.8 },
  ]

  const patient = patientData || mockPatient
  const meals = mealsData || mockMeals
  const weightEvolution = weightData?.data || mockWeightData

  const initials = patient.name
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const tabs = [
    { id: "diario" as const, label: "Diário", icon: BookOpen },
    { id: "plano" as const, label: "Plano", icon: UtensilsCrossed },
    { id: "evolucao" as const, label: "Evolução", icon: TrendingUp },
    { id: "relatorio" as const, label: "Relatório", icon: FileText },
    { id: "checkins" as const, label: "Check-ins", icon: ClipboardCheck },
  ]

  // Dados de calorias (mock para agora)
  const dailyData = {
    currentCalories: 1970,
    targetCalories: 2200,
    macros: {
      carbs: { current: 242, target: 280 },
      protein: { current: 104, target: 120 },
      fat: { current: 65, target: 70 },
    },
  }

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/dashboard/nutricionista/pacientes"
          className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#2DD49F] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para pacientes</span>
        </Link>

        {/* Patient Header */}
        {loadingPatient ? (
          <Card className="p-6 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#2DD49F] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">{initials}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2E3A59]">{patient.name}</h1>
              <p className="text-[#6B7280]">
                {patient.age} anos • {patient.goal}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#2DD49F] text-white shadow-lg"
                    : "bg-white text-[#6B7280] hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "diario" && (
          <div className="space-y-6">
            {/* Daily Calories */}
            <DailyCaloriesCard
              currentCalories={dailyData.currentCalories}
              targetCalories={dailyData.targetCalories}
              macros={dailyData.macros}
            />

            {/* Meals */}
            <div>
              <h2 className="text-2xl font-bold text-[#2E3A59] mb-4">Refeições de hoje</h2>
              {loadingMeals ? (
                <Card className="p-12 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
                </Card>
              ) : meals.length === 0 ? (
                <Card className="p-12">
                  <p className="text-center text-[#6B7280]">
                    Nenhuma refeição registrada hoje.
                  </p>
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
        )}

        {activeTab === "evolucao" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#2E3A59]">Evolução do peso</h2>
            {loadingWeight ? (
              <Card className="p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
              </Card>
            ) : weightEvolution.length > 0 ? (
              <WeightEvolutionCard
                initialWeight={weightEvolution[0]?.weight || 0}
                currentWeight={weightEvolution[weightEvolution.length - 1]?.weight || 0}
                weightLost={
                  (weightEvolution[weightEvolution.length - 1]?.weight || 0) -
                  (weightEvolution[0]?.weight || 0)
                }
                data={weightEvolution}
              />
            ) : (
              <Card className="p-12">
                <p className="text-center text-[#6B7280]">
                  Nenhum dado de evolução disponível.
                </p>
              </Card>
            )}
          </div>
        )}

        {(activeTab === "plano" || activeTab === "relatorio" || activeTab === "checkins") && (
          <Card className="p-12">
            <p className="text-center text-[#6B7280]">
              Funcionalidade em desenvolvimento.
            </p>
          </Card>
        )}
      </div>
    </DashboardWrapper>
  )
}
