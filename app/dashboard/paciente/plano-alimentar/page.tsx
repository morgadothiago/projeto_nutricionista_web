"use client"

import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { UtensilsCrossed, Loader2, AlertCircle } from "lucide-react"
import { useApi } from "@/app/hooks/useApi"
import { getPlans } from "@/app/services/api"

export default function PlanoAlimentarPage() {
  useRequirePaciente()

  // Fetch dados da API
  const {
    data: plansData,
    loading: loadingPlans,
    error: errorPlans,
  } = useApi<any>(getPlans)

  // Por enquanto, não exibir dados até a API retornar planos alimentares
  const plans: any[] = []
  const hasPlans = false

  if (loadingPlans) {
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

        {/* Error State */}
        {errorPlans ? (
          <Card className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
                  Erro ao carregar plano alimentar
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Não foi possível carregar os dados. Tente novamente mais tarde.
                </p>
              </div>
            </div>
          </Card>
        ) : !hasPlans ? (
          /* Empty State */
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
          /* Plans Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan: any) => (
              <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#2E3A59]">{plan.name}</h3>
                    <p className="text-sm text-[#6B7280] mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#2DD49F]">
                      R$ {plan.price?.toFixed(2)}
                    </span>
                    <span className="text-sm text-[#6B7280]">/{plan.billingCycle}</span>
                  </div>

                  {plan.discountPercentage > 0 && (
                    <div className="inline-block px-3 py-1 bg-[#FF8C42] text-white text-xs font-semibold rounded-full">
                      {plan.discountPercentage}% de desconto
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[#2E3A59]">Benefícios:</h4>
                    <ul className="space-y-1">
                      {plan.benefits?.map((benefit: string, index: number) => (
                        <li key={index} className="text-sm text-[#6B7280] flex items-start gap-2">
                          <span className="text-[#2DD49F] mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-[#6B7280]">
                      Público: <span className="font-medium">{plan.audience}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardWrapper>
  )
}
