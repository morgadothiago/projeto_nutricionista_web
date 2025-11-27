import { FormInput, FormSelect } from "@/components/form"
import { User, Calendar, Briefcase, Phone, MapPin } from "lucide-react"
import { DadosPessoaisData } from "@/types/anamnese"

interface Step1Props {
  data: DadosPessoaisData
  onChange: (data: Partial<DadosPessoaisData>) => void
  errors?: Partial<Record<keyof DadosPessoaisData, string>>
}

export function Step1DadosPessoais({ data, onChange, errors }: Step1Props) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
          <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
          Passo 1 de 5
        </div>
        <h2 className="text-4xl font-bold text-[#2E3A59] tracking-tight">
          Dados Pessoais
        </h2>
        <p className="text-lg text-gray-500 leading-relaxed">
          Vamos começar com suas informações básicas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nome */}
        <FormInput
          id="nome"
          name="nome"
          type="text"
          label="Nome Completo"
          required
          leftIcon={<User className="h-5 w-5" />}
          placeholder="Seu nome completo"
          className="py-3 rounded-xl bg-white"
          containerClassName="md:col-span-2"
          value={data.nome}
          onChange={(e) => onChange({ nome: e.target.value })}
          error={errors?.nome}
        />

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
        <FormSelect
          id="genero"
          name="genero"
          label="Gênero"
          required
          placeholder="Selecione"
          value={data.genero}
          onValueChange={(value) =>
            onChange({ genero: value as DadosPessoaisData["genero"] })
          }
          options={[
            { value: "masculino", label: "Masculino" },
            { value: "feminino", label: "Feminino" },
            { value: "outro", label: "Outro" },
          ]}
          error={errors?.genero}
        />

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
        <FormSelect
          id="estado"
          name="estado"
          label="Estado"
          required
          placeholder="Selecione"
          value={data.estado}
          onValueChange={(value) => onChange({ estado: value })}
          options={[
            { value: "AC", label: "Acre" },
            { value: "AL", label: "Alagoas" },
            { value: "AP", label: "Amapá" },
            { value: "AM", label: "Amazonas" },
            { value: "BA", label: "Bahia" },
            { value: "CE", label: "Ceará" },
            { value: "DF", label: "Distrito Federal" },
            { value: "ES", label: "Espírito Santo" },
            { value: "GO", label: "Goiás" },
            { value: "MA", label: "Maranhão" },
            { value: "MT", label: "Mato Grosso" },
            { value: "MS", label: "Mato Grosso do Sul" },
            { value: "MG", label: "Minas Gerais" },
            { value: "PA", label: "Pará" },
            { value: "PB", label: "Paraíba" },
            { value: "PR", label: "Paraná" },
            { value: "PE", label: "Pernambuco" },
            { value: "PI", label: "Piauí" },
            { value: "RJ", label: "Rio de Janeiro" },
            { value: "RN", label: "Rio Grande do Norte" },
            { value: "RS", label: "Rio Grande do Sul" },
            { value: "RO", label: "Rondônia" },
            { value: "RR", label: "Roraima" },
            { value: "SC", label: "Santa Catarina" },
            { value: "SP", label: "São Paulo" },
            { value: "SE", label: "Sergipe" },
            { value: "TO", label: "Tocantins" },
          ]}
          error={errors?.estado}
        />
      </div>
    </div>
  )
}
