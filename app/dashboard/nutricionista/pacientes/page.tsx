"use client"

import { useRequireNutricionista } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { Users, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PacientesPage() {
  const { userName } = useRequireNutricionista()

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E3A59] flex items-center gap-3">
              <Users className="w-8 h-8 text-[#2DD49F]" />
              Meus Pacientes
            </h1>
            <p className="text-[#6B7280] mt-2">
              Gerencie e acompanhe seus pacientes
            </p>
          </div>
          <Button className="bg-[#2DD49F] hover:bg-[#24b685]">
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <Input
              placeholder="Buscar paciente por nome, email ou telefone..."
              className="pl-10"
            />
          </div>
        </Card>

        {/* Patients List */}
        <Card className="p-8">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
              Nenhum paciente cadastrado
            </h3>
            <p className="text-[#6B7280] mb-6">
              Comece adicionando seu primeiro paciente
            </p>
            <Button className="bg-[#2DD49F] hover:bg-[#24b685]">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Paciente
            </Button>
          </div>
        </Card>
      </div>
    </DashboardWrapper>
  )
}
