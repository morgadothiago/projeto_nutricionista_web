/**
 * Mock de dados do dashboard
 * Estatísticas e atividades de exemplo
 */

import {
  Users,
  Calendar,
  TrendingUp,
  Apple,
  CheckCircle,
  Clock,
  Heart,
  Target,
  type LucideIcon,
} from "lucide-react"

export interface StatCardData {
  title: string
  value: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  iconColor: string
  iconBgColor: string
}

export interface ActivityData {
  id: string
  title: string
  description: string
  time: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
}

/**
 * Estatísticas do Nutricionista
 */
export const NUTRICIONISTA_STATS: StatCardData[] = [
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
]

/**
 * Atividades recentes do Nutricionista
 */
export const NUTRICIONISTA_ACTIVITIES: ActivityData[] = [
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
]

/**
 * Estatísticas do Paciente
 */
export const PACIENTE_STATS: StatCardData[] = [
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

/**
 * Atividades recentes do Paciente
 */
export const PACIENTE_ACTIVITIES: ActivityData[] = [
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
