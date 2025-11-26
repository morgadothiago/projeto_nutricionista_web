import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  Apple,
  FileText,
  MessageSquare,
  Settings,
  TrendingUp,
  Heart,
  BookOpen,
  PieChart,
} from "lucide-react"
import type { MenuSection } from "@/types"

// Configuração específica para cada role
const NUTRICIONISTA_DASHBOARD = "/dashboard/nutricionista"
const PACIENTE_DASHBOARD = "/dashboard/paciente"

export const MENU_CONFIG: MenuSection[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: NUTRICIONISTA_DASHBOARD,
        icon: LayoutDashboard,
        roles: ["nutricionista"],
      },
      {
        label: "Dashboard",
        href: PACIENTE_DASHBOARD,
        icon: LayoutDashboard,
        roles: ["paciente"],
      },
    ],
  },
  {
    title: "Gestão", // Apenas para nutricionistas
    items: [
      {
        label: "Pacientes",
        href: "/dashboard/pacientes",
        icon: Users,
        roles: ["nutricionista"],
      },
      {
        label: "Consultas",
        href: "/dashboard/consultas",
        icon: Calendar,
        roles: ["nutricionista"],
      },
      {
        label: "Planos Alimentares",
        href: "/dashboard/planos",
        icon: ClipboardList,
        roles: ["nutricionista"],
      },
      {
        label: "Receitas",
        href: "/dashboard/receitas",
        icon: Apple,
        roles: ["nutricionista"],
      },
    ],
  },
  {
    title: "Meu Acompanhamento", // Apenas para pacientes
    items: [
      {
        label: "Meu Plano",
        href: "/dashboard/meu-plano",
        icon: ClipboardList,
        roles: ["paciente"],
      },
      {
        label: "Minhas Consultas",
        href: "/dashboard/minhas-consultas",
        icon: Calendar,
        roles: ["paciente"],
      },
      {
        label: "Evolução",
        href: "/dashboard/paciente/evolucao",
        icon: TrendingUp,
        roles: ["paciente"],
      },
      {
        label: "Diário Alimentar",
        href: "/dashboard/paciente/diario-alimentar",
        icon: BookOpen,
        roles: ["paciente"],
      },
    ],
  },
  {
    title: "Análises", // Apenas para nutricionistas
    items: [
      {
        label: "Relatórios",
        href: "/dashboard/relatorios",
        icon: FileText,
        roles: ["nutricionista"],
      },
      {
        label: "Estatísticas",
        href: "/dashboard/estatisticas",
        icon: PieChart,
        roles: ["nutricionista"],
      },
    ],
  },
  {
    title: "Comunicação",
    items: [
      {
        label: "Mensagens",
        href: "/dashboard/mensagens",
        icon: MessageSquare,
        roles: ["nutricionista", "paciente"],
        badge: 3, // Exemplo de badge
      },
    ],
  },
  {
    title: "Saúde", // Apenas para pacientes
    items: [
      {
        label: "Minha Saúde",
        href: "/dashboard/saude",
        icon: Heart,
        roles: ["paciente"],
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        label: "Configurações",
        href: "/dashboard/configuracoes",
        icon: Settings,
        roles: ["nutricionista", "paciente"],
      },
    ],
  },
]

/**
 * Filtra os itens do menu baseado na role do usuário
 */
export function getMenuForRole(userRole: string): MenuSection[] {
  return MENU_CONFIG.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.roles.includes(userRole as "nutricionista" | "paciente")
    ),
  })).filter((section) => section.items.length > 0)
}
