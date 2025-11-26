"use client"

import { useState } from "react"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Meal {
  id: string
  name: string
  time: string
  items: {
    category: string
    foods: string[]
  }[]
  isExpanded: boolean
}

export default function DiarioAlimentarPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "1",
      name: "Café da manhã",
      time: "07:00",
      isExpanded: true,
      items: [
        {
          category: "Fonte de proteína (escolha 1):",
          foods: [
            "2 ovos cozidos ou mexidos",
            "1 fatia de queijo branco",
            "1 copo de iogurte natural sem açúcar"
          ]
        },
        {
          category: "Carboidrato (escolha 1):",
          foods: [
            "2 fatias de pão integral (8g)"
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Almoço",
      time: "12:00",
      isExpanded: false,
      items: [
        {
          category: "Fonte de proteína (escolha 1):",
          foods: [
            "100g de peito de frango grelhado",
            "2 ovos cozidos (aprox. 100g)",
            "Filé de Nile de 120g ou de atum",
            "Grão de bico cozido (aprox. 5 colheres de sopa)"
          ]
        }
      ]
    },
    {
      id: "3",
      name: "Lanche da Tarde",
      time: "17:00",
      isExpanded: false,
      items: [
        {
          category: "Fonte de proteína (escolha 1):",
          foods: [
            "170g de iogurte natural sem açúcar",
            "2 ovos cozidos (100g)"
          ]
        },
        {
          category: "Carboidrato:",
          foods: [
            "Fruta de baixo índice glicêmico (8g)"
          ]
        }
      ]
    },
    {
      id: "4",
      name: "Jantar",
      time: "20:00",
      isExpanded: false,
      items: [
        {
          category: "Fonte de proteína (escolha 1):",
          foods: [
            "100g de peito de frango, filé de peixe ou carne magra (equivalente a 116g pequeno/médio)",
            "Grão de bico ou lentilha cozido (118 médio do tamanho da palma da mão)",
            "2 ovos mexidos ou cozidos (100g)"
          ]
        }
      ]
    }
  ])

  const [selectedDay, setSelectedDay] = useState("QUA")
  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

  const toggleMeal = (mealId: string) => {
    setMeals(meals.map(meal =>
      meal.id === mealId
        ? { ...meal, isExpanded: !meal.isExpanded }
        : meal
    ))
  }

  return (
    <DashboardLayout
      userName={session?.user?.name || ""}
      userRole={session?.user?.role || ""}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💚</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Plano Alimentar</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Confira as refeições que estão dentro do seu plano alimentar
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

        {/* Meals List */}
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

              {/* Meal Content */}
              {meal.isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 mt-4">
                    {meal.items.map((item, idx) => (
                      <div key={idx}>
                        <p className="font-medium text-gray-900 text-sm mb-2">
                          {item.category}
                        </p>
                        <ul className="space-y-1.5">
                          {item.foods.map((food, foodIdx) => (
                            <li
                              key={foodIdx}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="text-emerald-500 mr-2">•</span>
                              <span>{food}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
