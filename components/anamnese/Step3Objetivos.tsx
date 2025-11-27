import { FormInput } from "@/components/form"
import { Target, TrendingDown, TrendingUp, Activity, Calendar } from "lucide-react"
import { ObjetivosData } from "@/types/anamnese"
import { useEffect, useState } from "react"

interface Step3Props {
  data: ObjetivosData
  onChange: (data: Partial<ObjetivosData>) => void
  errors?: Partial<Record<keyof ObjetivosData, string>>
}

const OBJETIVOS = [
  {
    value: "perder-peso",
    label: "Perder Peso",
    icon: TrendingDown,
    color: "bg-red-100 text-red-600",
  },
  {
    value: "ganhar-massa",
    label: "Ganhar Massa",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "manter-peso",
    label: "Manter Peso",
    icon: Activity,
    color: "bg-green-100 text-green-600",
  },
  {
    value: "saude-geral",
    label: "Saúde Geral",
    icon: Target,
    color: "bg-purple-100 text-purple-600",
  },
]

export function Step3Objetivos({ data, onChange, errors }: Step3Props) {
  const [imc, setImc] = useState<number | null>(null)
  const [imcCategoria, setImcCategoria] = useState<string>("")

  useEffect(() => {
    if (data.pesoAtual && data.altura) {
      const alturaMetros = data.altura / 100
      const imcCalculado = data.pesoAtual / (alturaMetros * alturaMetros)
      setImc(imcCalculado)

      // Categorizar IMC
      if (imcCalculado < 18.5) {
        setImcCategoria("Abaixo do peso")
      } else if (imcCalculado < 25) {
        setImcCategoria("Peso normal")
      } else if (imcCalculado < 30) {
        setImcCategoria("Sobrepeso")
      } else {
        setImcCategoria("Obesidade")
      }
    }
  }, [data.pesoAtual, data.altura])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
          Seus Objetivos
        </h2>
        <p className="text-gray-600">
          Vamos definir suas metas nutricionais
        </p>
      </div>

      {/* Objetivo Principal */}
      <div>
        <label className="block text-sm font-medium text-[#2E3A59] mb-3">
          Qual é seu objetivo principal? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OBJETIVOS.map((obj) => {
            const Icon = obj.icon
            return (
              <button
                key={obj.value}
                type="button"
                onClick={() =>
                  onChange({
                    objetivo: obj.value as ObjetivosData["objetivo"],
                  })
                }
                className={`p-4 rounded-xl border-2 transition-all ${
                  data.objetivo === obj.value
                    ? "border-[#2DD49F] bg-[#2DD49F]/5"
                    : "border-gray-200 hover:border-[#2DD49F]/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${obj.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-center">{obj.label}</p>
              </button>
            )
          })}
        </div>
        {errors?.objetivo && (
          <p className="mt-1 text-sm text-red-500">{errors.objetivo}</p>
        )}
      </div>

      {/* Medidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Peso Atual */}
        <FormInput
          id="pesoAtual"
          name="pesoAtual"
          type="number"
          label="Peso Atual (kg)"
          required
          placeholder="Ex: 70"
          className="py-3 rounded-xl bg-white"
          value={data.pesoAtual || ""}
          onChange={(e) => onChange({ pesoAtual: parseFloat(e.target.value) })}
          error={errors?.pesoAtual}
          step="0.1"
        />

        {/* Altura */}
        <FormInput
          id="altura"
          name="altura"
          type="number"
          label="Altura (cm)"
          required
          placeholder="Ex: 170"
          className="py-3 rounded-xl bg-white"
          value={data.altura || ""}
          onChange={(e) => onChange({ altura: parseFloat(e.target.value) })}
          error={errors?.altura}
          step="0.1"
        />
      </div>

      {/* IMC */}
      {imc && (
        <div className="p-4 bg-gradient-to-r from-[#2DD49F]/10 to-[#24b685]/10 rounded-xl border border-[#2DD49F]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Seu IMC</p>
              <p className="text-2xl font-bold text-[#2DD49F]">
                {imc.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Categoria</p>
              <p className="text-lg font-semibold text-[#2E3A59]">
                {imcCategoria}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Peso Desejado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="pesoDesejado"
          name="pesoDesejado"
          type="number"
          label="Peso Desejado (kg)"
          required
          placeholder="Ex: 65"
          className="py-3 rounded-xl bg-white"
          value={data.pesoDesejado || ""}
          onChange={(e) =>
            onChange({ pesoDesejado: parseFloat(e.target.value) })
          }
          error={errors?.pesoDesejado}
          step="0.1"
        />

        {/* Prazo */}
        <FormInput
          id="prazoObjetivo"
          name="prazoObjetivo"
          type="text"
          label="Em quanto tempo?"
          required
          leftIcon={<Calendar className="h-5 w-5" />}
          placeholder="Ex: 3 meses, 6 meses"
          className="py-3 rounded-xl bg-white"
          value={data.prazoObjetivo || ""}
          onChange={(e) => onChange({ prazoObjetivo: e.target.value })}
          error={errors?.prazoObjetivo}
        />
      </div>

      {/* Diferença de peso */}
      {data.pesoAtual && data.pesoDesejado && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Meta</p>
          <p className="text-lg font-semibold text-[#2E3A59]">
            {data.pesoAtual > data.pesoDesejado ? (
              <>
                Perder{" "}
                <span className="text-[#2DD49F]">
                  {(data.pesoAtual - data.pesoDesejado).toFixed(1)} kg
                </span>
              </>
            ) : data.pesoAtual < data.pesoDesejado ? (
              <>
                Ganhar{" "}
                <span className="text-[#2DD49F]">
                  {(data.pesoDesejado - data.pesoAtual).toFixed(1)} kg
                </span>
              </>
            ) : (
              <>
                Manter peso atual{" "}
                <span className="text-[#2DD49F]">{data.pesoAtual} kg</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
