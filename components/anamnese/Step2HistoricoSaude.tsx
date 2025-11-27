import { FormInput } from "@/components/form"
import { Heart, AlertCircle, Pill, Activity } from "lucide-react"
import { HistoricoSaudeData } from "@/types/anamnese"
import { useState } from "react"

interface Step2Props {
  data: HistoricoSaudeData
  onChange: (data: Partial<HistoricoSaudeData>) => void
  errors?: Partial<Record<keyof HistoricoSaudeData, string>>
}

const DOENCAS_COMUNS = [
  "Diabetes",
  "Hipertensão",
  "Colesterol Alto",
  "Hipotireoidismo",
  "Hipertireoidismo",
  "Doença Celíaca",
  "Síndrome do Intestino Irritável",
  "Gastrite",
  "Refluxo",
]

const ALERGIAS_COMUNS = [
  "Lactose",
  "Glúten",
  "Amendoim",
  "Frutos do Mar",
  "Ovo",
  "Soja",
  "Nozes",
]

export function Step2HistoricoSaude({ data, onChange, errors }: Step2Props) {
  const [outraDoenca, setOutraDoenca] = useState("")
  const [outraAlergia, setOutraAlergia] = useState("")

  const toggleDoenca = (doenca: string) => {
    const current = data.doencasPreexistentes || []
    if (current.includes(doenca)) {
      onChange({
        doencasPreexistentes: current.filter((d) => d !== doenca),
      })
    } else {
      onChange({ doencasPreexistentes: [...current, doenca] })
    }
  }

  const toggleAlergia = (alergia: string) => {
    const current = data.alergias || []
    if (current.includes(alergia)) {
      onChange({ alergias: current.filter((a) => a !== alergia) })
    } else {
      onChange({ alergias: [...current, alergia] })
    }
  }

  const adicionarDoenca = () => {
    if (outraDoenca.trim()) {
      onChange({
        doencasPreexistentes: [...(data.doencasPreexistentes || []), outraDoenca.trim()],
      })
      setOutraDoenca("")
    }
  }

  const adicionarAlergia = () => {
    if (outraAlergia.trim()) {
      onChange({
        alergias: [...(data.alergias || []), outraAlergia.trim()],
      })
      setOutraAlergia("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
          Histórico de Saúde
        </h2>
        <p className="text-gray-600">
          Informações importantes sobre sua saúde
        </p>
      </div>

      {/* Doenças Preexistentes */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Heart className="h-5 w-5 text-[#2DD49F]" />
          Possui alguma doença ou condição?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
          {DOENCAS_COMUNS.map((doenca) => (
            <button
              key={doenca}
              type="button"
              onClick={() => toggleDoenca(doenca)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                data.doencasPreexistentes?.includes(doenca)
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {doenca}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Outra doença..."
            value={outraDoenca}
            onChange={(e) => setOutraDoenca(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), adicionarDoenca())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={adicionarDoenca}
            className="px-4 py-2 bg-[#2DD49F] text-white rounded-lg hover:bg-[#24b685] transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Alergias */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <AlertCircle className="h-5 w-5 text-[#2DD49F]" />
          Possui alguma alergia alimentar?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
          {ALERGIAS_COMUNS.map((alergia) => (
            <button
              key={alergia}
              type="button"
              onClick={() => toggleAlergia(alergia)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                data.alergias?.includes(alergia)
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {alergia}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Outra alergia..."
            value={outraAlergia}
            onChange={(e) => setOutraAlergia(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), adicionarAlergia())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={adicionarAlergia}
            className="px-4 py-2 bg-[#2DD49F] text-white rounded-lg hover:bg-[#24b685] transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Medicamentos */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-2">
          <Pill className="h-5 w-5 text-[#2DD49F]" />
          Medicamentos em uso
        </label>
        <textarea
          placeholder="Liste os medicamentos que você usa regularmente (separados por vírgula)"
          value={data.medicamentos?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              medicamentos: e.target.value
                .split(",")
                .map((m) => m.trim())
                .filter((m) => m),
            })
          }
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none resize-none"
        />
      </div>

      {/* Cirurgias Recentes */}
      <FormInput
        id="cirurgiasRecentes"
        name="cirurgiasRecentes"
        type="text"
        label="Cirurgias recentes (últimos 12 meses)"
        leftIcon={<Activity className="h-5 w-5" />}
        placeholder="Descreva cirurgias recentes, se houver"
        className="py-3 rounded-xl bg-white"
        value={data.cirurgiasRecentes || ""}
        onChange={(e) => onChange({ cirurgiasRecentes: e.target.value })}
      />

      {/* Outras Condições */}
      <div>
        <label className="block text-sm font-medium text-[#2E3A59] mb-2">
          Outras informações relevantes sobre sua saúde
        </label>
        <textarea
          placeholder="Qualquer outra informação que considere importante..."
          value={data.outrasCondicoes || ""}
          onChange={(e) => onChange({ outrasCondicoes: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none resize-none"
        />
      </div>
    </div>
  )
}
