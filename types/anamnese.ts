/**
 * Tipos para o formulário multi-step de Anamnese/Avaliação Nutricional
 */

// Step 1: Dados Pessoais
export interface DadosPessoaisData {
  nome: string
  dataNascimento: string
  genero: "masculino" | "feminino" | "outro"
  profissao: string
  telefone: string
  cidade: string
  estado: string
}

// Step 2: Histórico de Saúde
export interface HistoricoSaudeData {
  doencasPreexistentes: string[]
  alergias: string[]
  medicamentos: string[]
  cirurgiasRecentes: string
  outrasCondicoes: string
}

// Step 3: Objetivos
export interface ObjetivosData {
  objetivo: "perder-peso" | "ganhar-massa" | "manter-peso" | "saude-geral" | "outro"
  pesoAtual: number
  altura: number
  pesoDesejado: number
  prazoObjetivo: string
}

// Step 4: Hábitos Alimentares
export interface HabitosAlimentaresData {
  numeroRefeicoes: number
  aguaPorDia: number
  restricoesAlimentares: string[]
  alimentosPreferidos: string[]
  alimentosEvitados: string[]
  comeFora: "raramente" | "as-vezes" | "frequentemente" | "sempre"
}

// Step 5: Estilo de Vida
export interface EstiloVidaData {
  nivelAtividadeFisica: "sedentario" | "leve" | "moderado" | "intenso"
  horasSono: number
  qualidadeSono: "ruim" | "regular" | "bom" | "excelente"
  nivelEstresse: number // 1-10
  fuma: boolean
  consumoAlcool: "nao" | "raramente" | "moderado" | "frequente"
}

// Dados completos do formulário
export interface AnamneseFormData {
  dadosPessoais: DadosPessoaisData
  historicoSaude: HistoricoSaudeData
  objetivos: ObjetivosData
  habitosAlimentares: HabitosAlimentaresData
  estiloVida: EstiloVidaData
}

// Step Info
export interface StepInfo {
  id: number
  title: string
  description: string
  icon: string
}
