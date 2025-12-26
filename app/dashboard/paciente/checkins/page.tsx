"use client"

import { useRequirePaciente } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { CheckinCard } from "@/app/components/dashboard/checkin-card"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, AlertCircle } from "lucide-react"
import { useApi } from "@/app/hooks/useApi"
import { getCheckins } from "@/app/services/api"
import { Card } from "@/components/ui/card"

export default function CheckinsPage() {
  const { userName } = useRequirePaciente()

  // Fetch dados da API
  const {
    data: checkinsData,
    loading: loadingCheckins,
    error: errorCheckins,
  } = useApi<any>(getCheckins)

  const checkins = checkinsData || []

  return (
    <DashboardWrapper userRole="paciente">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E3A59]">Check-ins</h1>
            <p className="text-[#6B7280] mt-2">Registre seu progresso</p>
          </div>
          <Button className="bg-[#2DD49F] hover:bg-[#24b685]">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Check-in
          </Button>
        </div>

        {/* Check-ins List */}
        {loadingCheckins ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : errorCheckins ? (
          <Card className="p-6 bg-[#FFF3E0] border-[#FF8C42]">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#FF8C42]" />
              <div>
                <p className="font-semibold text-[#2E3A59]">
                  Erro ao carregar check-ins
                </p>
                <p className="text-sm text-[#6B7280]">{errorCheckins}</p>
              </div>
            </div>
          </Card>
        ) : checkins.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-[#6B7280]">
                Nenhum check-in registrado. Clique em "Adicionar Check-in" para
                começar!
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {checkins.map((checkin: any, index: number) => (
              <CheckinCard
                key={index}
                date={checkin.date}
                weight={checkin.weight}
                waist={checkin.waist}
                hip={checkin.hip}
                bodyFat={checkin.bodyFat}
                notes={checkin.notes}
                isRecent={checkin.isRecent}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardWrapper>
  )
}
