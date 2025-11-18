"use client"

import { Menu, Bell, Search, LogOut, User } from "lucide-react"
import { useAuthContext } from "@/app/contexts/auth-context"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  userName: string
  userRole: string
  onMenuClick: () => void
}

export function DashboardHeader({
  userName,
  userRole,
  onMenuClick,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { logout, isLoading } = useAuthContext()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadgeColor = (role: string) => {
    return role === "nutricionista"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-blue-100 text-blue-700"
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu Button - Mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative w-64 lg:w-96">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search Icon - Mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {getInitials(userName)}
                </span>
              </div>

              {/* User Info - Desktop */}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info - Mobile */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userName.toLowerCase().replace(" ", "")}@email.com
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(
                        userRole
                      )}`}
                    >
                      {userRole}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4" />
                      <span>Meu Perfil</span>
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          setShowUserMenu(false)
                          toast.loading("Saindo...")
                          await logout()
                          toast.dismiss()
                          toast.success("Logout realizado com sucesso!")
                        } catch (error) {
                          toast.dismiss()
                          toast.error("Erro ao fazer logout")
                          console.error("Erro no logout:", error)
                        }
                      }}
                      disabled={isLoading}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isLoading ? "Saindo..." : "Sair"}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
