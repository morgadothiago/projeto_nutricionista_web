"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function NutricionistaDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuthContext()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (userRole !== "nutricionista") {
        // Redireciona se não for nutricionista
        if (userRole === "paciente") {
          router.push("/dashboard/paciente")
        }
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
      </div>
    )
  }

  if (!isAuthenticated || userRole !== "nutricionista") {
    return null
  }

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">
            Dashboard Nutricionista
          </h1>
          <p className="text-[#6B7280] mt-2">
            Gerencie seus pacientes e acompanhe o progresso deles
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
              Total de Pacientes
            </h3>
            <p className="text-3xl font-bold text-[#2DD49F]">0</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
              Consultas Hoje
            </h3>
            <p className="text-3xl font-bold text-[#2DD49F]">0</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[#2E3A59] mb-2">
              Planos Ativos
            </h3>
            <p className="text-3xl font-bold text-[#2DD49F]">0</p>
          </Card>
        </div>
      </div>
    </DashboardWrapper>
  )
}
