"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"
import { StatCard } from "@/app/components/dashboard/stat-card"
import { ActivityCard } from "@/app/components/dashboard/activity-card"
import {
  Users,
  Calendar,
  TrendingUp,
  Apple,
  CheckCircle,
} from "lucide-react"

export default function NutricionistaDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Proteção de rota e verificação de role
  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Redireciona se não for nutricionista
    if (session.user?.role !== "nutricionista") {
      router.push("/dashboard/paciente")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-poppins">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== "nutricionista") {
    return null
  }

  const nutricionistaStats = [
    {
      title: "Total de Pacientes",
      value: "48",
      icon: Users,
      trend: { value: "12%", positive: true },
    },
    {
      title: "Consultas Hoje",
      value: "8",
      icon: Calendar,
    },
    {
      title: "Planos Ativos",
      value: "35",
      icon: Apple,
      trend: { value: "8%", positive: true },
    },
    {
      title: "Taxa de Sucesso",
      value: "94%",
      icon: TrendingUp,
      trend: { value: "3%", positive: true },
    },
  ]

  const nutricionistaActivities = [
    {
      id: "1",
      title: "Nova consulta agendada",
      description: "Maria Costa - 15:00",
      time: "Há 5 minutos",
      icon: Calendar,
    },
    {
      id: "2",
      title: "Plano alimentar atualizado",
      description: "João Oliveira completou o check-in",
      time: "Há 30 minutos",
      icon: CheckCircle,
    },
    {
      id: "3",
      title: "Novo paciente cadastrado",
      description: "Pedro Santos aguarda primeira consulta",
      time: "Há 1 hora",
      icon: Users,
    },
  ]

  return (
    <DashboardLayout userName={session.user?.name || ""} userRole="nutricionista">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground font-poppins mb-2">
          Olá, Dr(a). {session.user?.name}! 👋
        </h1>
        <p className="text-muted-foreground font-poppins">
          Aqui está um resumo das suas atividades hoje.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {nutricionistaStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities */}
        <div className="lg:col-span-2">
          <ActivityCard activities={nutricionistaActivities} />
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground font-poppins mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 gradient-primary text-primary-foreground rounded-lg font-medium font-poppins hover:opacity-90 shadow-card hover:shadow-hover transition-all duration-200">
              <Calendar className="w-5 h-5" />
              <span>Nova Consulta</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-card border-2 border-border text-foreground rounded-lg font-medium font-poppins hover:border-primary hover:text-primary transition-all duration-200">
              <Users className="w-5 h-5" />
              <span>Adicionar Paciente</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-card border-2 border-border text-foreground rounded-lg font-medium font-poppins hover:border-primary hover:text-primary transition-all duration-200">
              <Apple className="w-5 h-5" />
              <span>Criar Plano</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-accent/20 border border-border rounded-xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground font-poppins mb-2">
          💡 Dica do Dia
        </h3>
        <p className="text-muted-foreground font-poppins">
          Mantenha seus pacientes engajados enviando mensagens de incentivo regularmente!
        </p>
      </div>
    </DashboardLayout>
  )
}
