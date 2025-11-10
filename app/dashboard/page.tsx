"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import {
  Users,
  Calendar,
  TrendingUp,
  Apple,
  CheckCircle,
  Clock,
  Heart,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const userRole = session.user?.role || "paciente";
  const isNutricionista = userRole === "nutricionista";

  // Conteúdo específico para Nutricionista
  const nutricionistaStats = [
    {
      title: "Total de Pacientes",
      value: "48",
      icon: Users,
      trend: { value: "12%", positive: true },
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Consultas Hoje",
      value: "8",
      icon: Calendar,
      iconColor: "text-emerald-600",
      iconBgColor: "bg-emerald-100",
    },
    {
      title: "Planos Ativos",
      value: "35",
      icon: Apple,
      trend: { value: "8%", positive: true },
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Taxa de Sucesso",
      value: "94%",
      icon: TrendingUp,
      trend: { value: "3%", positive: true },
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
    },
  ];

  const nutricionistaActivities = [
    {
      id: "1",
      title: "Nova consulta agendada",
      description: "Maria Costa - 15:00",
      time: "Há 5 minutos",
      icon: Calendar,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
    {
      id: "2",
      title: "Plano alimentar atualizado",
      description: "João Oliveira completou o check-in",
      time: "Há 30 minutos",
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
    },
    {
      id: "3",
      title: "Novo paciente cadastrado",
      description: "Pedro Santos aguarda primeira consulta",
      time: "Há 1 hora",
      icon: Users,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100",
    },
  ];

  // Conteúdo específico para Paciente
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
  ];

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
  ];

  const stats = isNutricionista ? nutricionistaStats : pacienteStats;
  const activities = isNutricionista ? nutricionistaActivities : pacienteActivities;

  return (
    <DashboardLayout userName={session.user?.name || ""} userRole={userRole}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Olá, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          {isNutricionista
            ? "Aqui está um resumo das suas atividades hoje."
            : "Acompanhe seu progresso e mantenha-se motivado!"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities */}
        <div className="lg:col-span-2">
          <ActivityCard activities={activities} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            {isNutricionista ? (
              <>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Nova Consulta</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Adicionar Paciente</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200">
                  <Apple className="w-5 h-5" />
                  <span className="font-medium">Criar Plano</span>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
          💡 Dica do Dia
        </h3>
        <p className="text-emerald-700">
          {isNutricionista
            ? "Mantenha seus pacientes engajados enviando mensagens de incentivo regularmente!"
            : "Beba pelo menos 2 litros de água por dia para manter-se hidratado e saudável!"}
        </p>
      </div>
    </DashboardLayout>
  );
}
