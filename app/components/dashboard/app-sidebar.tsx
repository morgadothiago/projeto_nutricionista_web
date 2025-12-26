"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  Home,
  BookOpen,
  UtensilsCrossed,
  TrendingUp,
  ClipboardCheck,
  Settings,
  LogOut,
  LayoutDashboard,
  Users,
  BarChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthContext } from "@/app/contexts/auth-context"
import { toast } from "sonner"

interface MenuItem {
  label: string
  href: string
  icon: React.ElementType
  roles: string[]
}

interface AppSidebarProps {
  userRole: "nutricionista" | "paciente"
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/dashboard/paciente",
    icon: Home,
    roles: ["paciente"],
  },
  {
    label: "Dashboard",
    href: "/dashboard/nutricionista",
    icon: LayoutDashboard,
    roles: ["nutricionista"],
  },
  {
    label: "Diário",
    href: "/dashboard/paciente/diario-alimentar",
    icon: BookOpen,
    roles: ["paciente"],
  },
  {
    label: "Plano",
    href: "/dashboard/paciente/plano-alimentar",
    icon: UtensilsCrossed,
    roles: ["paciente"],
  },
  {
    label: "Evolução",
    href: "/dashboard/paciente/evolucao",
    icon: TrendingUp,
    roles: ["paciente"],
  },
  {
    label: "Check-ins",
    href: "/dashboard/paciente/checkins",
    icon: ClipboardCheck,
    roles: ["paciente"],
  },
  {
    label: "Pacientes",
    href: "/dashboard/nutricionista/pacientes",
    icon: Users,
    roles: ["nutricionista"],
  },
  {
    label: "Relatórios",
    href: "/dashboard/nutricionista/relatorios",
    icon: BarChart,
    roles: ["nutricionista"],
  },
  {
    label: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
    roles: ["paciente", "nutricionista"],
  },
]

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuthContext()

  const menuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  )

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logout realizado com sucesso!")
      router.push("/login")
    } catch (error) {
      toast.error("Erro ao fazer logout")
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Image
          src="/Logo.svg"
          alt="ZapNutre"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <span className="text-xl font-semibold text-[#2E3A59]">ZapNutre</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#2DD49F] text-white shadow-sm"
                  : "text-[#6B7280] hover:bg-gray-50 hover:text-[#2E3A59]"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:text-[#2E3A59] transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}
