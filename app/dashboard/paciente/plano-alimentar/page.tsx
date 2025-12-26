"use client"

import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { DayMealPlan } from "@/app/components/dashboard/day-meal-plan"
import { SubstitutionsCard } from "@/app/components/dashboard/substitutions-card"
import { NutritionistNotes } from "@/app/components/dashboard/nutritionist-notes"
import { Card } from "@/components/ui/card"
import { UtensilsCrossed, Loader2, AlertCircle } from "lucide-react"
import { useApi } from "@/app/hooks/useApi"
import { getMealPlan, getSubstitutions, getNutritionistNotes } from "@/app/services/api"

export default function PlanoAlimentarPage() {
  const { userName } = useRequirePaciente()

  // Fetch dados da API
  const {
    data: weekPlanData,
    loading: loadingPlan,
    error: errorPlan,
  } = useApi<any>(getMealPlan)

  const {
    data: substitutionsData,
    loading: loadingSubs,
  } = useApi<any>(getSubstitutions)

  const {
    data: notesData,
    loading: loadingNotes,
  } = useApi<any>(getNutritionistNotes)

  const weekPlan = weekPlanData || []
  const substitutions = substitutionsData || []
  const nutritionistNotes = notesData?.notes || ""
  const hasMealPlan = weekPlan.length > 0

  // Dados mockados de exemplo (não mais usado)
  const _exampleWeekPlan = [
    {
      dayName: "Segunda-feira",
      meals: [
        {
          time: "07:00",
          name: "Café da manhã",
          items: [
            "2 fatias pão integral",
            "2 ovos mexidos",
            "1 copo suco laranja",
          ],
        },
        {
          time: "10:00",
          name: "Lanche",
          items: ["1 maçã", "5 castanhas"],
        },
        {
          time: "12:30",
          name: "Almoço",
          items: [
            "150g arroz integral",
            "100g feijão",
            "150g frango grelhado",
            "Salada à vontade",
          ],
        },
        {
          time: "16:00",
          name: "Lanche",
          items: ["Iogurte natural", "30g granola"],
        },
        {
          time: "19:30",
          name: "Jantar",
          items: [
            "150g peixe assado",
            "150g batata doce",
            "Legumes no vapor",
          ],
        },
      ],
    },
    {
      dayName: "Terça-feira",
      meals: [
        {
          time: "07:00",
          name: "Café da manhã",
          items: ["Overnight oats", "Frutas vermelhas"],
        },
        {
          time: "10:00",
          name: "Lanche",
          items: ["1 banana", "1 colher pasta amendoim"],
        },
        {
          time: "12:30",
          name: "Almoço",
          items: [
            "150g macarrão integral",
            "Molho de tomate caseiro",
            "100g carne moída magra",
          ],
        },
        {
          time: "16:00",
          name: "Lanche",
          items: ["Vitamina de frutas"],
        },
        {
          time: "19:30",
          name: "Jantar",
          items: ["Omelete de legumes", "Salada verde"],
        },
      ],
    },
    {
      dayName: "Quarta-feira",
      meals: [
        {
          time: "07:00",
          name: "Café da manhã",
          items: ["Tapioca com queijo", "Café com leite"],
        },
        {
          time: "10:00",
          name: "Lanche",
          items: ["Mix de oleaginosas"],
        },
        {
          time: "12:30",
          name: "Almoço",
          items: [
            "150g arroz integral",
            "100g lentilha",
            "150g carne grelhada",
            "Legumes refogados",
          ],
        },
        {
          time: "16:00",
          name: "Lanche",
          items: ["Iogurte grego", "Frutas picadas"],
        },
        {
          time: "19:30",
          name: "Jantar",
          items: ["Sopa de legumes", "Torrada integral"],
        },
      ],
    },
    {
      dayName: "Quinta-feira",
      meals: [
        {
          time: "07:00",
          name: "Café da manhã",
          items: ["Panqueca de aveia", "Mel", "Frutas"],
        },
        {
          time: "10:00",
          name: "Lanche",
          items: ["1 pera", "Queijo cottage"],
        },
        {
          time: "12:30",
          name: "Almoço",
          items: [
            "150g quinoa",
            "150g salmão",
            "Salada variada",
            "Azeite",
          ],
        },
        {
          time: "16:00",
          name: "Lanche",
          items: ["Smoothie verde"],
        },
        {
          time: "19:30",
          name: "Jantar",
          items: [
            "Frango desfiado",
            "Purê de abóbora",
            "Brócolis",
          ],
        },
      ],
    },
    {
      dayName: "Sexta-feira",
      meals: [
        {
          time: "07:00",
          name: "Café da manhã",
          items: ["Pão integral", "Abacate amassado", "Ovo pochê"],
        },
        {
          time: "10:00",
          name: "Lanche",
          items: ["Barra de cereal integral"],
        },
        {
          time: "12:30",
          name: "Almoço",
          items: [
            "150g arroz",
            "100g feijão branco",
            "150g filé de tilápia",
            "Salada",
          ],
        },
        {
          time: "16:00",
          name: "Lanche",
          items: ["Iogurte", "Granola"],
        },
        {
          time: "19:30",
          name: "Jantar",
          items: ["Pizza caseira integral", "Salada"],
        },
      ],
    },
  ]

  if (loadingPlan) {
    return (
      <DashboardWrapper userRole="paciente">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2E3A59]">Plano Alimentar</h1>
            <p className="text-[#6B7280] mt-2">Seu plano personalizado</p>
          </div>
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        </div>
      </DashboardWrapper>
    )
  }

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">Plano Alimentar</h1>
          <p className="text-[#6B7280] mt-2">Seu plano personalizado</p>
        </div>

        {/* Empty State ou Content */}
        {!hasMealPlan ? (
          <Card className="p-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#FFF3E0] flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-10 h-10 text-[#FF8C42]" />
              </div>
              <h3 className="text-xl font-bold text-[#2E3A59] mb-2">
                Nenhum plano alimentar cadastrado
              </h3>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Aguarde seu nutricionista criar um plano personalizado para você.
                Enquanto isso, você pode agendar uma consulta.
              </p>

            </div>
          </Card>
        ) : (
          <>
            {/* Week Meal Plan */}
            <div className="space-y-6">
              {weekPlan.map((day: any, index: number) => (
                <DayMealPlan
                  key={index}
                  dayName={day.dayName}
                  meals={day.meals}
                />
              ))}
            </div>

            {/* Substitutions */}
            <SubstitutionsCard substitutions={substitutions} />

            {/* Nutritionist Notes */}
            <NutritionistNotes notes={nutritionistNotes} />
          </>
        )}
      </div>
    </DashboardWrapper>
  )
}
