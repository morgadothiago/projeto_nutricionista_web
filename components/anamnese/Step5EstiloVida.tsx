import { Activity, Moon, Brain, Cigarette, Wine } from "lucide-react"
import { EstiloVidaData } from "@/types/anamnese"

interface Step5Props {
  data: EstiloVidaData
  onChange: (data: Partial<EstiloVidaData>) => void
  errors?: Partial<Record<keyof EstiloVidaData, string>>
}

const NIVEIS_ATIVIDADE = [
  {
    value: "sedentario",
    label: "Sedentário",
    description: "Pouco ou nenhum exercício",
  },
  {
    value: "leve",
    label: "Leve",
    description: "Exercício leve 1-3 dias/semana",
  },
  {
    value: "moderado",
    label: "Moderado",
    description: "Exercício moderado 3-5 dias/semana",
  },
  {
    value: "intenso",
    label: "Intenso",
    description: "Exercício intenso 6-7 dias/semana",
  },
]

export function Step5EstiloVida({ data, onChange, errors }: Step5Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
          Estilo de Vida
        </h2>
        <p className="text-gray-600">
          Últimas informações sobre sua rotina
        </p>
      </div>

      {/* Nível de Atividade Física */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Activity className="h-5 w-5 text-[#2DD49F]" />
          Qual seu nível de atividade física? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NIVEIS_ATIVIDADE.map((nivel) => (
            <button
              key={nivel.value}
              type="button"
              onClick={() =>
                onChange({
                  nivelAtividadeFisica: nivel.value as EstiloVidaData["nivelAtividadeFisica"],
                })
              }
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.nivelAtividadeFisica === nivel.value
                  ? "border-[#2DD49F] bg-[#2DD49F]/5"
                  : "border-gray-200 hover:border-[#2DD49F]/50"
              }`}
            >
              <p className="font-semibold text-[#2E3A59] mb-1">{nivel.label}</p>
              <p className="text-sm text-gray-600">{nivel.description}</p>
            </button>
          ))}
        </div>
        {errors?.nivelAtividadeFisica && (
          <p className="mt-1 text-sm text-red-500">
            {errors.nivelAtividadeFisica}
          </p>
        )}
      </div>

      {/* Horas de Sono */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Moon className="h-5 w-5 text-[#2DD49F]" />
          Quantas horas você dorme por noite? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {[4, 5, 6, 7, 8, 9, 10].map((horas) => (
            <button
              key={horas}
              type="button"
              onClick={() => onChange({ horasSono: horas })}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                data.horasSono === horas
                  ? "bg-[#2DD49F] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {horas}h
            </button>
          ))}
        </div>
        {errors?.horasSono && (
          <p className="mt-1 text-sm text-red-500">{errors.horasSono}</p>
        )}
      </div>

      {/* Qualidade do Sono */}
      <div>
        <label className="block text-sm font-medium text-[#2E3A59] mb-3">
          Como você avalia a qualidade do seu sono? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "ruim", label: "Ruim", emoji: "😞" },
            { value: "regular", label: "Regular", emoji: "😐" },
            { value: "bom", label: "Bom", emoji: "🙂" },
            { value: "excelente", label: "Excelente", emoji: "😊" },
          ].map((opcao) => (
            <button
              key={opcao.value}
              type="button"
              onClick={() =>
                onChange({
                  qualidadeSono: opcao.value as EstiloVidaData["qualidadeSono"],
                })
              }
              className={`p-4 rounded-xl border-2 transition-all ${
                data.qualidadeSono === opcao.value
                  ? "border-[#2DD49F] bg-[#2DD49F]/5"
                  : "border-gray-200 hover:border-[#2DD49F]/50"
              }`}
            >
              <div className="text-3xl mb-2 text-center">{opcao.emoji}</div>
              <p className="text-sm font-medium text-center">{opcao.label}</p>
            </button>
          ))}
        </div>
        {errors?.qualidadeSono && (
          <p className="mt-1 text-sm text-red-500">{errors.qualidadeSono}</p>
        )}
      </div>

      {/* Nível de Estresse */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Brain className="h-5 w-5 text-[#2DD49F]" />
          Como está seu nível de estresse? (1-10) <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="1"
            max="10"
            value={data.nivelEstresse || 5}
            onChange={(e) =>
              onChange({ nivelEstresse: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2DD49F]"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Muito baixo</span>
            <span className="font-bold text-[#2DD49F] text-2xl">
              {data.nivelEstresse || 5}
            </span>
            <span>Muito alto</span>
          </div>
        </div>
        {errors?.nivelEstresse && (
          <p className="mt-1 text-sm text-red-500">{errors.nivelEstresse}</p>
        )}
      </div>

      {/* Tabagismo */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Cigarette className="h-5 w-5 text-[#2DD49F]" />
          Você fuma? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ fuma: true })}
            className={`p-4 rounded-xl border-2 transition-all ${
              data.fuma === true
                ? "border-[#2DD49F] bg-[#2DD49F]/5"
                : "border-gray-200 hover:border-[#2DD49F]/50"
            }`}
          >
            <p className="text-sm font-medium text-center">Sim</p>
          </button>
          <button
            type="button"
            onClick={() => onChange({ fuma: false })}
            className={`p-4 rounded-xl border-2 transition-all ${
              data.fuma === false
                ? "border-[#2DD49F] bg-[#2DD49F]/5"
                : "border-gray-200 hover:border-[#2DD49F]/50"
            }`}
          >
            <p className="text-sm font-medium text-center">Não</p>
          </button>
        </div>
        {errors?.fuma && (
          <p className="mt-1 text-sm text-red-500">{errors.fuma}</p>
        )}
      </div>

      {/* Consumo de Álcool */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#2E3A59] mb-3">
          <Wine className="h-5 w-5 text-[#2DD49F]" />
          Com que frequência você consome bebidas alcoólicas? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "nao", label: "Não consumo" },
            { value: "raramente", label: "Raramente" },
            { value: "moderado", label: "Moderadamente" },
            { value: "frequente", label: "Frequentemente" },
          ].map((opcao) => (
            <button
              key={opcao.value}
              type="button"
              onClick={() =>
                onChange({
                  consumoAlcool: opcao.value as EstiloVidaData["consumoAlcool"],
                })
              }
              className={`p-4 rounded-xl border-2 transition-all ${
                data.consumoAlcool === opcao.value
                  ? "border-[#2DD49F] bg-[#2DD49F]/5"
                  : "border-gray-200 hover:border-[#2DD49F]/50"
              }`}
            >
              <p className="text-sm font-medium text-center">{opcao.label}</p>
            </button>
          ))}
        </div>
        {errors?.consumoAlcool && (
          <p className="mt-1 text-sm text-red-500">{errors.consumoAlcool}</p>
        )}
      </div>

      {/* Info Final */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Quase lá!</strong> Na próxima etapa, você poderá revisar todas as
          informações antes de enviar.
        </p>
      </div>
    </div>
  )
}
