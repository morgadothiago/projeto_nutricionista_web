"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react"
import { ProgressBar } from "./ProgressBar"
import { Step1DadosPessoais } from "./Step1DadosPessoais"
import { Step2HistoricoSaude } from "./Step2HistoricoSaude"
import { Step3Objetivos } from "./Step3Objetivos"
import { Step4HabitosAlimentares } from "./Step4HabitosAlimentares"
import { Step5EstiloVida } from "./Step5EstiloVida"
import type {
  AnamneseFormData,
  DadosPessoaisData,
  HistoricoSaudeData,
  ObjetivosData,
  HabitosAlimentaresData,
  EstiloVidaData,
} from "@/types/anamnese"

const STEPS = [
  { id: 1, title: "Dados Pessoais" },
  { id: 2, title: "Histórico de Saúde" },
  { id: 3, title: "Objetivos" },
  { id: 4, title: "Hábitos Alimentares" },
  { id: 5, title: "Estilo de Vida" },
]

interface MultiStepFormProps {
  onSubmit: (data: AnamneseFormData) => Promise<void>
}

export function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // Estado inicial do formulário
  const [formData, setFormData] = useState<AnamneseFormData>({
    dadosPessoais: {
      dataNascimento: "",
      genero: "" as any,
      profissao: "",
      telefone: "",
      cidade: "",
      estado: "",
    },
    historicoSaude: {
      doencasPreexistentes: [],
      alergias: [],
      medicamentos: [],
      cirurgiasRecentes: "",
      outrasCondicoes: "",
    },
    objetivos: {
      objetivo: "" as any,
      pesoAtual: 0,
      altura: 0,
      pesoDesejado: 0,
      prazoObjetivo: "",
    },
    habitosAlimentares: {
      numeroRefeicoes: 0,
      aguaPorDia: 0,
      restricoesAlimentares: [],
      alimentosPreferidos: [],
      alimentosEvitados: [],
      comeFora: "" as any,
    },
    estiloVida: {
      nivelAtividadeFisica: "" as any,
      horasSono: 0,
      qualidadeSono: "" as any,
      nivelEstresse: 5,
      fuma: false,
      consumoAlcool: "" as any,
    },
  })

  const updateFormData = (step: keyof AnamneseFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: any = {}

    switch (step) {
      case 1:
        if (!formData.dadosPessoais.dataNascimento)
          newErrors.dataNascimento = "Campo obrigatório"
        if (!formData.dadosPessoais.genero)
          newErrors.genero = "Campo obrigatório"
        if (!formData.dadosPessoais.profissao)
          newErrors.profissao = "Campo obrigatório"
        if (!formData.dadosPessoais.telefone)
          newErrors.telefone = "Campo obrigatório"
        if (!formData.dadosPessoais.cidade)
          newErrors.cidade = "Campo obrigatório"
        if (!formData.dadosPessoais.estado)
          newErrors.estado = "Campo obrigatório"
        break

      case 3:
        if (!formData.objetivos.objetivo)
          newErrors.objetivo = "Selecione um objetivo"
        if (!formData.objetivos.pesoAtual || formData.objetivos.pesoAtual <= 0)
          newErrors.pesoAtual = "Peso inválido"
        if (!formData.objetivos.altura || formData.objetivos.altura <= 0)
          newErrors.altura = "Altura inválida"
        if (!formData.objetivos.pesoDesejado || formData.objetivos.pesoDesejado <= 0)
          newErrors.pesoDesejado = "Peso inválido"
        if (!formData.objetivos.prazoObjetivo)
          newErrors.prazoObjetivo = "Campo obrigatório"
        break

      case 4:
        if (!formData.habitosAlimentares.numeroRefeicoes)
          newErrors.numeroRefeicoes = "Selecione o número de refeições"
        if (!formData.habitosAlimentares.aguaPorDia)
          newErrors.aguaPorDia = "Selecione a quantidade de água"
        if (!formData.habitosAlimentares.comeFora)
          newErrors.comeFora = "Campo obrigatório"
        break

      case 5:
        if (!formData.estiloVida.nivelAtividadeFisica)
          newErrors.nivelAtividadeFisica = "Campo obrigatório"
        if (!formData.estiloVida.horasSono)
          newErrors.horasSono = "Campo obrigatório"
        if (!formData.estiloVida.qualidadeSono)
          newErrors.qualidadeSono = "Campo obrigatório"
        if (formData.estiloVida.fuma === undefined || formData.estiloVida.fuma === null)
          newErrors.fuma = "Campo obrigatório"
        if (!formData.estiloVida.consumoAlcool)
          newErrors.consumoAlcool = "Campo obrigatório"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1DadosPessoais
            data={formData.dadosPessoais}
            onChange={(data) => updateFormData("dadosPessoais", data)}
            errors={errors}
          />
        )
      case 2:
        return (
          <Step2HistoricoSaude
            data={formData.historicoSaude}
            onChange={(data) => updateFormData("historicoSaude", data)}
            errors={errors}
          />
        )
      case 3:
        return (
          <Step3Objetivos
            data={formData.objetivos}
            onChange={(data) => updateFormData("objetivos", data)}
            errors={errors}
          />
        )
      case 4:
        return (
          <Step4HabitosAlimentares
            data={formData.habitosAlimentares}
            onChange={(data) => updateFormData("habitosAlimentares", data)}
            errors={errors}
          />
        )
      case 5:
        return (
          <Step5EstiloVida
            data={formData.estiloVida}
            onChange={(data) => updateFormData("estiloVida", data)}
            errors={errors}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#2E3A59] hover:bg-gray-50 shadow-md"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Voltar
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD49F] to-[#24b685] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Próximo
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD49F] to-[#24b685] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Finalizar
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
