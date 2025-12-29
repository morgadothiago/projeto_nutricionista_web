"use client"

import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { UtensilsCrossed } from "lucide-react"

export default function PlanoAlimentarPage() {
  useRequirePaciente()

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">Plano Alimentar</h1>
          <p className="text-[#6B7280] mt-2">Seu plano personalizado</p>
        </div>

        {/* Empty State */}
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
      </div>
    </DashboardWrapper>
  )
}
