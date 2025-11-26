"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/app/components/dashboard/dashboard-layout"

export default function MensagensPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userRole = (session.user?.role as "nutricionista" | "paciente") || "paciente"

  return (
    <DashboardLayout userName={session.user?.name || ""} userRole={userRole}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-gray-900">Hello World - Mensagens</h1>
      </div>
    </DashboardLayout>
  )
}
