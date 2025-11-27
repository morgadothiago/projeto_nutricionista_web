"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MultiStepForm } from "@/components/anamnese/MultiStepForm"
import type { AnamneseFormData } from "@/types/anamnese"
import { api } from "@/app/services/api"

export default function AnamnesePublicaPage() {
  const router = useRouter()

  const handleSubmit = async (data: AnamneseFormData) => {
    console.log("========================================")
    console.log("📋 DADOS DO FORMULÁRIO:")
    console.log("   Nome:", data.dadosPessoais.nome)
    console.log("   Telefone:", data.dadosPessoais.telefone)
    console.log("========================================")

    try {
      // 1️⃣ ENVIA PARA O BACKEND (salva no banco)
      console.log("💾 [BACKEND] Enviando para /anamnesis...")
      const response = await api.post("/anamnesis", data)


      toast.success("Anamnese salva com sucesso!", {
        description: "Seus dados foram recebidos.",
        duration: 3000,
      })

    } catch (error: any) {
      console.error("❌ [BACKEND] Erro:", error)
      let errorMessage = "Erro ao enviar anamnese. Tente novamente."

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Erro ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor."
      }

      toast.error("Erro ao salvar", {
        description: errorMessage,
      })

      throw error
    }

  }

  return <MultiStepForm onSubmit={handleSubmit} />
}
