"use client"

import { useState } from "react"
import { useRequireNutricionista } from "@/app/contexts/auth-context"
import { DashboardWrapper } from "@/app/components/dashboard/dashboard-wrapper"
import { PatientCard } from "@/app/components/dashboard/patient-card"
import { Input } from "@/components/ui/input"
import { Search, Filter, TrendingDown, TrendingUp, Activity, Weight, Target, Calendar } from "lucide-react"
import { useApi } from "@/app/hooks/useApi"
import { getPatients } from "@/app/services/api"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

type StatusFilter = "todos" | "ativos" | "atencao" | "inativos"
type AlertFilter = "baixo-engajamento" | "excesso-calorias" | "deficit-calorico" | "peso-inconsistente" | "meta-nao-atingida" | "sem-checkin" | null

export default function PacientesPage() {
  useRequireNutricionista()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos")
  const [alertFilter, setAlertFilter] = useState<AlertFilter>(null)

  // Fetch pacientes da API
  const { data: patientsData, loading, error } = useApi<any>(getPatients)

  // Dados mockados enquanto o backend não implementa o endpoint
  const mockPatients = [
    {
      id: "1",
      name: "Maria Silva",
      lastCheckin: "Hoje",
      status: "ativo" as const,
      alerts: [],
    },
    {
      id: "2",
      name: "João Santos",
      lastCheckin: "Ontem",
      status: "ativo" as const,
      alerts: [],
    },
    {
      id: "3",
      name: "Ana Costa",
      lastCheckin: "Há 3 dias",
      status: "atencao" as const,
      alerts: ["baixo-engajamento"],
    },
    {
      id: "4",
      name: "Pedro Lima",
      lastCheckin: "Há 1 semana",
      status: "atencao" as const,
      alerts: ["sem-checkin"],
    },
    {
      id: "5",
      name: "Carla Souza",
      lastCheckin: "Hoje",
      status: "ativo" as const,
      alerts: [],
    },
    {
      id: "6",
      name: "Lucas Oliveira",
      lastCheckin: "Há 2 semanas",
      status: "inativo" as const,
      alerts: ["sem-checkin"],
    },
  ]

  const patients = patientsData?.patients || mockPatients

  // Filtrar pacientes
  const filteredPatients = patients.filter((patient: any) => {
    // Filtro de busca
    if (searchTerm && !patient.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Filtro de status
    if (statusFilter !== "todos" && patient.status !== statusFilter) {
      return false
    }

    // Filtro de alerta
    if (alertFilter && !patient.alerts?.includes(alertFilter)) {
      return false
    }

    return true
  })

  const statusFilters = [
    { value: "todos" as const, label: "Todos", color: "bg-[#2DD49F] text-white" },
    { value: "ativos" as const, label: "Ativos", color: "bg-gray-100 text-[#6B7280]" },
    { value: "atencao" as const, label: "Atenção", color: "bg-gray-100 text-[#6B7280]" },
    { value: "inativos" as const, label: "Inativos", color: "bg-gray-100 text-[#6B7280]" },
  ]

  const alertFilters = [
    { value: "baixo-engajamento" as const, label: "Baixo engajamento", icon: TrendingDown },
    { value: "excesso-calorias" as const, label: "Excesso de calorias", icon: TrendingUp },
    { value: "deficit-calorico" as const, label: "Déficit calórico", icon: Activity },
    { value: "peso-inconsistente" as const, label: "Peso inconsistente", icon: Weight },
    { value: "meta-nao-atingida" as const, label: "Meta semanal não atingida", icon: Target },
    { value: "sem-checkin" as const, label: "30 dias sem check-in", icon: Calendar },
  ]

  return (
    <DashboardWrapper userRole="nutricionista">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#2E3A59]">Pacientes</h1>
          <p className="text-[#6B7280] mt-2">Gerencie seus pacientes</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar and Status Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white border-gray-200"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#2DD49F] transition-colors">
              <Filter className="w-5 h-5 text-[#6B7280]" />
            </button>
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                  statusFilter === filter.value
                    ? "bg-[#2DD49F] text-white"
                    : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Alert Filters */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrar por alerta</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {alertFilters.map((filter) => {
                const Icon = filter.icon
                const isActive = alertFilter === filter.value
                return (
                  <button
                    key={filter.value}
                    onClick={() => setAlertFilter(isActive ? null : filter.value)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[#2DD49F] text-white"
                        : "bg-gray-50 text-[#6B7280] hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Patients List */}
        {loading ? (
          <Card className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
          </Card>
        ) : filteredPatients.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-[#6B7280]">
                {searchTerm || statusFilter !== "todos" || alertFilter
                  ? "Nenhum paciente encontrado com os filtros aplicados."
                  : "Você ainda não tem pacientes cadastrados."}
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient: any) => (
              <PatientCard
                key={patient.id}
                id={patient.id}
                name={patient.name}
                lastCheckin={patient.lastCheckin}
                status={patient.status}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardWrapper>
  )
}
