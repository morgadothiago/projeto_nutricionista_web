"use client"

import { useRequireNutricionista } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { UtensilsCrossed, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PlanosPage() {
  const { userName } = useRequireNutricionista()

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E3A59] flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-[#FF8C42]" />
              Planos Alimentares
            </h1>
            <p className="text-[#6B7280] mt-2">
              Crie e gerencie planos alimentares personalizados
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-[#2DD49F] text-[#2DD49F] hover:bg-[#E6F9F0]">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button className="bg-[#2DD49F] hover:bg-[#24b685]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E6F9F0] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-[#2DD49F]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Planos Ativos</p>
                <p className="text-2xl font-bold text-[#2E3A59]">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-[#FF8C42]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Planos em Revisão</p>
                <p className="text-2xl font-bold text-[#2E3A59]">0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Total de Planos</p>
                <p className="text-2xl font-bold text-[#2E3A59]">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Plans List */}
        <Card className="p-8">
          <div className="text-center py-12">
            <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
              Nenhum plano alimentar criado
            </h3>
            <p className="text-[#6B7280] mb-6">
              Crie seu primeiro plano alimentar personalizado
            </p>
            <Button className="bg-[#2DD49F] hover:bg-[#24b685]">
              <Plus className="w-4 h-4 mr-2" />
              Criar Plano
            </Button>
          </div>
        </Card>
      </div>
    </DashboardWrapper>
  )
}
