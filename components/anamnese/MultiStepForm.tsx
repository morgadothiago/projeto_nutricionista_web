"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  isEmbedded?: boolean
}

export function MultiStepForm({ onSubmit, isEmbedded = false }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // Estado inicial do formulário
  const [formData, setFormData] = useState<AnamneseFormData>({
    dadosPessoais: {
      nome: "",
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
        if (!formData.dadosPessoais.nome)
          newErrors.nome = "Campo obrigatório"
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

  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    })
  }

  return (
    <div
      className={
        isEmbedded
          ? "w-full py-8"
          : "min-h-screen bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4] py-16 px-4"
      }
    >
      <div className="max-w-5xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 w-full flex justify-center"
        >
          <div className="flex items-center justify-between w-full max-w-[280px] sm:max-w-md md:max-w-3xl px-2 sm:px-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1 gap-2 md:gap-3 min-h-[90px] md:min-h-[100px]">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: currentStep === step.id ? 1.15 : 1,
                        backgroundColor: currentStep > step.id
                          ? "#2DD49F"
                          : currentStep === step.id
                          ? "#2DD49F"
                          : "#F3F4F6"
                      }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                        currentStep >= step.id ? "text-white shadow-lg sm:shadow-xl shadow-emerald-200" : "text-gray-400 border-2 border-gray-200"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    <motion.span
                      initial={false}
                      animate={{
                        color: currentStep === step.id ? "#2DD49F" : "#6B7280",
                        fontWeight: currentStep === step.id ? 600 : 500,
                        opacity: currentStep === step.id ? 1 : 0.8
                      }}
                      className="text-xs mt-1 text-center hidden md:flex md:items-center md:justify-center transition-all leading-tight max-w-[95px] h-10"
                    >
                      {step.title}
                    </motion.span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 h-1 sm:h-1.5 mx-1.5 sm:mx-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          width: currentStep > step.id ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" as const }}
                        className="h-full bg-gradient-to-r from-[#2DD49F] to-[#24b685] shadow-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
        </motion.div>

        {/* Form Content with Animation */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-12 relative">
          {/* Progress Bar at top */}
          <div className="h-2 bg-gray-100 w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" as const }}
              className="h-full bg-gradient-to-r from-[#2DD49F] to-[#24b685]"
            />
          </div>

          <div className="min-h-[600px] flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="flex-1 p-12 md:p-20"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center px-2 pb-4"
        >
          <motion.button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
            whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
            className={`flex items-center gap-3 px-12 py-5 rounded-2xl font-semibold text-base transition-all ${currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-[#2E3A59] hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200"
              }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Voltar</span>
          </motion.button>

          {currentStep < STEPS.length ? (
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#2DD49F] to-[#24b685] text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all"
            >
              <span className="hidden sm:inline">Próximo</span>
              <span className="sm:hidden">Avançar</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#2DD49F] to-[#24b685] text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
