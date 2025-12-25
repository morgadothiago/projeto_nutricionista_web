"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"
import { StatCard } from "@/app/components/dashboard/stat-card"
import { ActivityCard } from "@/app/components/dashboard/activity-card"
import {
  Calendar,
  Apple,
  CheckCircle,
  Clock,
  Heart,
  Target,
  TrendingUp,
} from "lucide-react"
import { ProfileCompletion } from "@/app/components/profile/profile-completion"

export default function PacienteDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Proteção de rota e verificação de role
  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Redireciona se não for paciente
    if (session.user?.role !== "paciente") {
      router.push("/dashboard/nutricionista")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== "paciente") {
    return null
  }

  const pacienteStats = [
    {
      title: "Meta de Peso",
      value: "75kg",
      icon: Target,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Próxima Consulta",
      value: "3 dias",
      icon: Calendar,
      iconColor: "text-emerald-600",
      iconBgColor: "bg-emerald-100",
    },
    {
      title: "Refeições Hoje",
      value: "3/5",
      icon: Apple,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Saúde Geral",
      value: "Ótima",
      icon: Heart,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100",
    },
  ]

  const pacienteActivities = [
    {
      id: "1",
      title: "Refeição registrada",
      description: "Café da manhã - 350 kcal",
      time: "Há 2 horas",
      icon: Apple,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
    },
    {
      id: "2",
      title: "Meta de água atingida",
      description: "2L de água consumidos hoje",
      time: "Há 4 horas",
      icon: CheckCircle,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      id: "3",
      title: "Lembrete de consulta",
      description: "Sua próxima consulta é em 3 dias",
      time: "Há 6 horas",
      icon: Clock,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100",
    },
  ]

  return (
    <DashboardLayout userName={session.user?.name || ""} userRole="paciente">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Olá, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Acompanhe seu progresso e mantenha-se motivado!
        </p>
      </div>

      {/* Profile Completion */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
        <ProfileCompletion
          percentage={65}
          label="Complete seu perfil nutricional"
          size="md"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {pacienteStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities */}
        <div className="lg:col-span-2">
          <ActivityCard activities={pacienteActivities} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Apple className="w-5 h-5" />
              <span className="font-medium">Registrar Refeição</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Ver Consultas</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Meu Progresso</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
          💡 Dica do Dia
        </h3>
        <p className="text-emerald-700">
          Beba pelo menos 2 litros de água por dia para manter-se hidratado e saudável!
        </p>
      </div>
    </DashboardLayout>
  )
}
