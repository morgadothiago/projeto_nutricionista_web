"use client"

import { useState } from "react"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Droplet } from "lucide-react"

interface WaterProgress {
  consumed: number
  goal: number
}

interface MealWaterRecord {
  id: string
  name: string
  time: string
  waterRecords: {
    amount: string
    description: string
  }[]
  isExpanded: boolean
}

export default function EvolucaoPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [selectedDay, setSelectedDay] = useState("QUA")
  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

  // Progresso geral de água do dia
  const [waterProgress] = useState<WaterProgress>({
    consumed: 1500, // 1.5L
    goal: 2000, // 2L
  })

  const [meals, setMeals] = useState<MealWaterRecord[]>([
    {
      id: "1",
      name: "Café da manhã",
      time: "07:00",
      isExpanded: false,
      waterRecords: [
        {
          amount: "1 copo de água (200ml) ✓",
          description: "Consumido às 07:15",
        },
        {
          amount: "1 xícara de chá (150ml) ✓",
          description: "Consumido às 07:30",
        },
        {
          amount: "1 copo de água (200ml) ✗",
          description: "Recomendado (pendente)",
        },
      ],
    },
    {
      id: "2",
      name: "Almoço",
      time: "12:00",
      isExpanded: true,
      waterRecords: [
        {
          amount: "1 copo de água antes (200ml) ✓",
          description: "Consumido às 11:45",
        },
        {
          amount: "1 copo de água durante (200ml) ✓",
          description: "Consumido às 12:15",
        },
        {
          amount: "1 copo de água após (200ml) ✓",
          description: "Consumido às 12:45",
        },
        {
          amount: "1 copo de suco natural (150ml) ✓",
          description: "Consumido às 12:30",
        },
      ],
    },
    {
      id: "3",
      name: "Lanche da Tarde",
      time: "17:00",
      isExpanded: false,
      waterRecords: [
        {
          amount: "1 copo de água (200ml) ✗",
          description: "Recomendado (pendente)",
        },
        {
          amount: "1 xícara de chá (150ml) ✗",
          description: "Opcional",
        },
      ],
    },
    {
      id: "4",
      name: "Jantar",
      time: "20:00",
      isExpanded: false,
      waterRecords: [
        {
          amount: "1 copo de água antes (200ml) ✗",
          description: "Recomendado",
        },
        {
          amount: "1 copo de água durante (200ml) ✗",
          description: "Recomendado",
        },
        {
          amount: "1 copo de água após (200ml) ✗",
          description: "Recomendado",
        },
      ],
    },
  ])

  const toggleMeal = (mealId: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId ? { ...meal, isExpanded: !meal.isExpanded } : meal
      )
    )
  }

  const progressPercentage = (waterProgress.consumed / waterProgress.goal) * 100

  return (
    <DashboardLayout
      userName={session?.user?.name || ""}
      userRole={session?.user?.role || ""}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Minha Evolução
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Registre seu consumo de água e acompanhe sua hidratação ao longo do
            dia.
          </p>
        </div>

        {/* Days of Week Selector */}
        <div className="flex justify-between mb-6 bg-white rounded-xl p-2 shadow-sm">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                selectedDay === day
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Overall Water Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Consumo de Água Hoje
              </h3>
              <p className="text-sm text-gray-600">
                Meta diária: {waterProgress.goal / 1000}L
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">
                {waterProgress.consumed / 1000}L
              </p>
              <p className="text-xs text-gray-500">
                {progressPercentage.toFixed(0)}% da meta
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0L</span>
            <span>{waterProgress.goal / 1000}L</span>
          </div>
        </div>

        {/* Meals Water Records */}
        <div className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Meal Header */}
              <button
                onClick={() => toggleMeal(meal.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                  <p className="text-sm text-gray-500">{meal.time}</p>
                </div>
                {meal.isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-500" />
                )}
              </button>

              {/* Meal Water Records */}
              {meal.isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-3 mt-4">
                    {meal.waterRecords.map((record, idx) => {
                      const isConsumed = record.amount.includes("✓")
                      const isPending = record.amount.includes("✗")

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            isConsumed
                              ? "bg-emerald-50 border-emerald-200"
                              : isPending
                              ? "bg-gray-50 border-gray-200"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p
                                className={`text-sm font-medium ${
                                  isConsumed
                                    ? "text-emerald-700"
                                    : "text-gray-700"
                                }`}
                              >
                                {record.amount}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {record.description}
                              </p>
                            </div>
                            <Droplet
                              className={`w-5 h-5 flex-shrink-0 ml-2 ${
                                isConsumed
                                  ? "text-emerald-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => router.back()}
            className="w-full py-3 px-4 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
