"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MultiStepForm } from "@/components/anamnese/MultiStepForm"
import type { AnamneseFormData } from "@/types/anamnese"
import { api } from "@/app/services/api"

export default function AnamnesePublicaPage() {
  const router = useRouter()

  const handleSubmit = async (data: AnamneseFormData) => {

    console.log(data)

    try {
      // Envia os dados para o backend (endpoint público)
      const response = await api.post("/anamnesis", data)

      toast.success("Anamnese enviada com sucesso!", {
        description: "Obrigado! Suas informações foram recebidas.",
        duration: 5000,
      })

      // Redireciona para a home após sucesso
      setTimeout(() => {
        router.push("/")
      }, 2500)
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
