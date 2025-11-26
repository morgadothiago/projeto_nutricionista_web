"use client"

import { cn } from "@/lib/utils"

interface ProfileCompletionProps {
  /**
   * Porcentagem de conclusão (0-100)
   */
  percentage: number
  /**
   * Texto descritivo
   */
  label?: string
  /**
   * Tamanho do componente
   */
  size?: "sm" | "md" | "lg"
  /**
   * Mostrar porcentagem no lado direito
   */
  showPercentage?: boolean
  /**
   * Classe CSS adicional
   */
  className?: string
}

export function ProfileCompletion({
  percentage,
  label = "Complete seu perfil nutricional",
  size = "md",
  showPercentage = true,
  className,
}: ProfileCompletionProps) {
  // Garante que a porcentagem está entre 0 e 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  // Define cores baseado na porcentagem
  const getColor = () => {
    if (clampedPercentage < 30) return "bg-red-500"
    if (clampedPercentage < 70) return "bg-yellow-500"
    return "bg-emerald-500"
  }

  // Define tamanhos
  const sizes = {
    sm: {
      container: "h-1.5",
      text: "text-xs",
    },
    md: {
      container: "h-2",
      text: "text-sm",
    },
    lg: {
      container: "h-3",
      text: "text-base",
    },
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Label e Porcentagem */}
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-gray-700 font-medium", sizes[size].text)}>
          {label}
        </span>
        {showPercentage && (
          <span className={cn("text-gray-600 font-semibold", sizes[size].text)}>
            {clampedPercentage}%
          </span>
        )}
      </div>

      {/* Barra de Progresso */}
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          sizes[size].container
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getColor()
          )}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Hook para calcular a porcentagem de conclusão do perfil
 */
export function useProfileCompletion(userData: {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  weight?: number
  height?: number
  gender?: string
  activityLevel?: string
  goal?: string
  [key: string]: any
}) {
  const fields = [
    "name",
    "email",
    "phone",
    "birthDate",
    "weight",
    "height",
    "gender",
    "activityLevel",
    "goal",
  ]

  const completedFields = fields.filter(
    (field) => userData[field] !== undefined && userData[field] !== null && userData[field] !== ""
  )

  const percentage = Math.round((completedFields.length / fields.length) * 100)

  return {
    percentage,
    completedFields: completedFields.length,
    totalFields: fields.length,
    missingFields: fields.filter((field) => !completedFields.includes(field)),
  }
}
