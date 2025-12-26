"use client"

import { AppSidebar } from "./app-sidebar"

interface DashboardWrapperProps {
  children: React.ReactNode
  userRole: "nutricionista" | "paciente"
}

export function DashboardWrapper({ children, userRole }: DashboardWrapperProps) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <AppSidebar userRole={userRole} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
