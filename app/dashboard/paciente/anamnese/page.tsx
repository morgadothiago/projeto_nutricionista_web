"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MultiStepForm } from "@/components/anamnese/MultiStepForm"
import type { AnamneseFormData } from "@/types/anamnese"
import { api } from "@/app/services/api"

export default function AnamnesePage() {
  const router = useRouter()

  const handleSubmit = async (data: AnamneseFormData) => {
    try {
      // Envia os dados para o backend
      const response = await api.post("/anamnesis", data)

      toast.success("Anamnese enviada com sucesso!", {
        description: "Seu nutricionista receberá suas informações em breve.",
      })

      // Redireciona para o dashboard
      setTimeout(() => {
        router.push("/dashboard/paciente")
      }, 2000)
    } catch (error: any) {
      let errorMessage = "Erro ao enviar anamnese. Tente novamente."

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Erro ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor."
      }

      toast.error("Erro ao enviar anamnese", {
        description: errorMessage,
      })

      throw error
    }
  }

  return <MultiStepForm onSubmit={handleSubmit} />
}
