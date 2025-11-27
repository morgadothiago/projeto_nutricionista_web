import { FormInput } from "@/components/form"
import { User, Calendar, Briefcase, Phone, MapPin } from "lucide-react"
import { DadosPessoaisData } from "@/types/anamnese"

interface Step1Props {
  data: DadosPessoaisData
  onChange: (data: Partial<DadosPessoaisData>) => void
  errors?: Partial<Record<keyof DadosPessoaisData, string>>
}

export function Step1DadosPessoais({ data, onChange, errors }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
          Dados Pessoais
        </h2>
        <p className="text-gray-600">
          Vamos começar com suas informações básicas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data de Nascimento */}
        <FormInput
          id="dataNascimento"
          name="dataNascimento"
          type="date"
          label="Data de Nascimento"
          required
          leftIcon={<Calendar className="h-5 w-5" />}
          className="py-3 rounded-xl bg-white"
          value={data.dataNascimento}
          onChange={(e) => onChange({ dataNascimento: e.target.value })}
          error={errors?.dataNascimento}
        />

        {/* Gênero */}
        <div>
          <label className="block text-sm font-medium text-[#2E3A59] mb-2">
            Gênero <span className="text-red-500">*</span>
          </label>
          <select
            value={data.genero}
            onChange={(e) =>
              onChange({
                genero: e.target.value as DadosPessoaisData["genero"],
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none transition-all bg-white"
            required
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
          {errors?.genero && (
            <p className="mt-1 text-sm text-red-500">{errors.genero}</p>
          )}
        </div>

        {/* Profissão */}
        <FormInput
          id="profissao"
          name="profissao"
          type="text"
          label="Profissão"
          required
          leftIcon={<Briefcase className="h-5 w-5" />}
          placeholder="Ex: Engenheiro, Professor"
          className="py-3 rounded-xl bg-white"
          value={data.profissao}
          onChange={(e) => onChange({ profissao: e.target.value })}
          error={errors?.profissao}
        />

        {/* Telefone */}
        <FormInput
          id="telefone"
          name="telefone"
          type="tel"
          label="Telefone"
          required
          leftIcon={<Phone className="h-5 w-5" />}
          placeholder="(00) 00000-0000"
          className="py-3 rounded-xl bg-white"
          value={data.telefone}
          onChange={(e) => onChange({ telefone: e.target.value })}
          error={errors?.telefone}
        />

        {/* Cidade */}
        <FormInput
          id="cidade"
          name="cidade"
          type="text"
          label="Cidade"
          required
          leftIcon={<MapPin className="h-5 w-5" />}
          placeholder="Sua cidade"
          className="py-3 rounded-xl bg-white"
          value={data.cidade}
          onChange={(e) => onChange({ cidade: e.target.value })}
          error={errors?.cidade}
        />

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-[#2E3A59] mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            value={data.estado}
            onChange={(e) => onChange({ estado: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-transparent outline-none transition-all bg-white"
            required
          >
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          {errors?.estado && (
            <p className="mt-1 text-sm text-red-500">{errors.estado}</p>
          )}
        </div>
      </div>
    </div>
  )
}
