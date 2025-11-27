import { Utensils, Droplet, Pizza, ThumbsUp, ThumbsDown } from "lucide-react"
import { HabitosAlimentaresData } from "@/types/anamnese"
import { useState } from "react"

interface Step4Props {
  data: HabitosAlimentaresData
  onChange: (data: Partial<HabitosAlimentaresData>) => void
  errors?: Partial<Record<keyof HabitosAlimentaresData, string>>
}

const RESTRICOES_COMUNS = [
  "Vegetariano",
  "Vegano",
  "Sem Lactose",
  "Sem Glúten",
  "Low Carb",
  "Sem Açúcar",
  "Halal",
  "Kosher",
]

export function Step4HabitosAlimentares({ data, onChange, errors }: Step4Props) {
  const [novoPreferido, setNovoPreferido] = useState("")
  const [novoEvitado, setNovoEvitado] = useState("")

  const toggleRestricao = (restricao: string) => {
    const current = data.restricoesAlimentares || []
    if (current.includes(restricao)) {
      onChange({
        restricoesAlimentares: current.filter((r) => r !== restricao),
      })
    } else {
      onChange({ restricoesAlimentares: [...current, restricao] })
    }
  }

  const adicionarPreferido = () => {
    if (novoPreferido.trim()) {
      onChange({
        alimentosPreferidos: [
          ...(data.alimentosPreferidos || []),
          novoPreferido.trim(),
        ],
      })
      setNovoPreferido("")
    }
  }

  const removerPreferido = (alimento: string) => {
    onChange({
      alimentosPreferidos: (data.alimentosPreferidos || []).filter(
        (a) => a !== alimento
      ),
    })
  }

  const adicionarEvitado = () => {
    if (novoEvitado.trim()) {
      onChange({
        alimentosEvitados: [
          ...(data.alimentosEvitados || []),
          novoEvitado.trim(),
        ],
      })
      setNovoEvitado("")
    }
  }

  const removerEvitado = (alimento: string) => {
    onChange({
      alimentosEvitados: (data.alimentosEvitados || []).filter(
        (a) => a !== alimento
      ),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
          Hábitos Alimentares
        </h2>
        <p className="text-gray-600">
          Conte-nos sobre sua rotina alimentar
        </p>
      </div>

      {/* Número de Refeições */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Utensils className="h-5 w-5 text-[#2DD49F]" />
          Quantas refeições você faz por dia? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange({ numeroRefeicoes: num })}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                data.numeroRefeicoes === num
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        {errors?.numeroRefeicoes && (
          <p className="mt-1 text-sm text-red-500">{errors.numeroRefeicoes}</p>
        )}
      </div>

      {/* Consumo de Água */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Droplet className="h-5 w-5 text-[#2DD49F]" />
          Quantos litros de água você bebe por dia? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((litros) => (
            <button
              key={litros}
              type="button"
              onClick={() => onChange({ aguaPorDia: litros })}
              className={`py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                data.aguaPorDia === litros
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {litros}L
            </button>
          ))}
        </div>
        {errors?.aguaPorDia && (
          <p className="mt-1 text-sm text-red-500">{errors.aguaPorDia}</p>
        )}
      </div>

      {/* Restrições Alimentares */}
      <div>
        <label className="block text-sm font-medium text-[#2E3A59] mb-3">
          Possui alguma restrição alimentar?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {RESTRICOES_COMUNS.map((restricao) => (
            <button
              key={restricao}
              type="button"
              onClick={() => toggleRestricao(restricao)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                data.restricoesAlimentares?.includes(restricao)
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {restricao}
            </button>
          ))}
        </div>
      </div>

      {/* Alimentos Preferidos */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-2">
          <ThumbsUp className="h-5 w-5 text-[#2DD49F]" />
          Alimentos que você gosta
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Ex: Frango, Arroz integral, Brócolis..."
            value={novoPreferido}
            onChange={(e) => setNovoPreferido(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), adicionarPreferido())
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={adicionarPreferido}
            className="px-4 py-2 bg-[#2DD49F] text-white rounded-lg hover:bg-[#24b685] transition-colors"
          >
            Adicionar
          </button>
        </div>
        {data.alimentosPreferidos && data.alimentosPreferidos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.alimentosPreferidos.map((alimento) => (
              <span
                key={alimento}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {alimento}
                <button
                  type="button"
                  onClick={() => removerPreferido(alimento)}
                  className="hover:text-green-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alimentos Evitados */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-2">
          <ThumbsDown className="h-5 w-5 text-[#2DD49F]" />
          Alimentos que você evita ou não gosta
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Ex: Fígado, Beterraba, Peixe..."
            value={novoEvitado}
            onChange={(e) => setNovoEvitado(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), adicionarEvitado())
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={adicionarEvitado}
            className="px-4 py-2 bg-[#2DD49F] text-white rounded-lg hover:bg-[#24b685] transition-colors"
          >
            Adicionar
          </button>
        </div>
        {data.alimentosEvitados && data.alimentosEvitados.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.alimentosEvitados.map((alimento) => (
              <span
                key={alimento}
                className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
              >
                {alimento}
                <button
                  type="button"
                  onClick={() => removerEvitado(alimento)}
                  className="hover:text-red-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Frequência de comer fora */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Pizza className="h-5 w-5 text-[#2DD49F]" />
          Com que frequência você come fora? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "raramente", label: "Raramente" },
            { value: "as-vezes", label: "Às vezes" },
            { value: "frequentemente", label: "Frequentemente" },
            { value: "sempre", label: "Quase sempre" },
          ].map((opcao) => (
            <button
              key={opcao.value}
              type="button"
              onClick={() =>
                onChange({
                  comeFora: opcao.value as HabitosAlimentaresData["comeFora"],
                })
              }
              className={`p-4 rounded-xl border-2 transition-all ${
                data.comeFora === opcao.value
                  ? "border-[#2DD49F] bg-[#2DD49F]/5"
                  : "border-gray-200 hover:border-[#2DD49F]/50"
              }`}
            >
              <p className="text-sm font-medium text-center">{opcao.label}</p>
            </button>
          ))}
        </div>
        {errors?.comeFora && (
          <p className="mt-1 text-sm text-red-500">{errors.comeFora}</p>
        )}
      </div>
    </div>
  )
}
