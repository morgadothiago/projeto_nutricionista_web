import { DoctorRegisterPayload, RegisterFormData } from "@/types"
import type { AnamneseFormData } from "@/types/anamnese"
import type {
  DailySummaryResponse,
  NutritionalGoalsResponse,
  TipOfTheDayResponse,
  MealsResponse,
  CreateMealPayload,
  UpdateMealPayload,
  MealPlanResponse,
  SubstitutionsResponse,
  NutritionistNotesResponse,
  PlansListResponse,
  PlanDetailResponse,
  WeightEvolutionResponse,
  CaloriesEvolutionResponse,
  CheckinsResponse,
  CreateCheckinPayload,
  ProfileResponse,
  UpdateProfilePayload,
  NotificationSettingsResponse,
  ChangePasswordPayload,
  DashboardStatsResponse,
  EngagementResponse,
  AlertsResponse,
  PatientsResponse,
  PatientDetailsResponse,
  ApiPatientRecord,
  Patient,
  AlertType,
} from "@/types"
import Axios, { type AxiosResponse } from "axios"

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://back-st1k.onrender.com",
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  // Verifica se está no browser antes de acessar localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// ==================== AUTH ====================

/**
 * Realiza o login do usuário
 */
export async function SignIn(login: { email: string; password: string }) {
  return await api.post("/auth/login", {
    email: login.email,
    password: login.password,
  })
}

/**
 * Registra um novo paciente
 */
export async function Register(register: RegisterFormData) {
  const phoneNumbers = (register.whatsappNumber || "").replace(/\D/g, "")
  const internationalPhone = phoneNumbers.startsWith("55")
    ? `+${phoneNumbers}`
    : `+55${phoneNumbers}`

  return await api.post("/auth/register", {
    name: register.name,
    email: register.email,
    password: register.password,
    whatsappNumber: internationalPhone,
    roles: ["paciente"],
  })
}

/**
 * Registra um novo nutricionista
 */
export async function RegisterDoctor(doctor: DoctorRegisterPayload) {
  const phoneNumbers = (doctor.whatsappNumber || "").replace(/\D/g, "")
  const internationalPhone = phoneNumbers.startsWith("55")
    ? `+${phoneNumbers}`
    : `+55${phoneNumbers}`

  return await api.post("/auth/register", {
    name: doctor.name,
    email: doctor.email,
    whatsappNumber: internationalPhone,
    password: doctor.password,
    roles: ["nutricionista"],
  })
}

// ==================== ANAMNESE ====================

export async function SubmitAnamnese(data: AnamneseFormData) {
  return await api.post("/anamnese", data)
}

export async function SubmitAnamnesePublic(data: AnamneseFormData) {
  return await api.post("/anamnese/public", data)
}

// ==================== DASHBOARD ====================

/**
 * Busca resumo diário do paciente (calorias, macros)
 */
export async function getDailySummary(pacientId: string, date?: string): Promise<AxiosResponse<DailySummaryResponse>> {
  const params = date ? { data: date } : {}
  return await api.get(`/metas-nutricionais/paciente/${pacientId}/resumo-diario`, { params })
}

/**
 * Busca metas nutricionais detalhadas do paciente
 */
export async function getNutritionalGoals(pacientId: string, date?: string): Promise<AxiosResponse<NutritionalGoalsResponse>> {
  const params = date ? { data: date } : {}
  return await api.get(`/metas-nutricionais/paciente/${pacientId}/resumo-diario`, { params })
}

/**
 * Busca dica do dia
 */
export async function getTipOfTheDay(): Promise<AxiosResponse<TipOfTheDayResponse>> {
  return await api.get("/dashboard/tip-of-day")
}

// ==================== DIÁRIO ALIMENTAR ====================

/**
 * Busca refeições do dia
 */
export async function getMeals(date?: string): Promise<AxiosResponse<MealsResponse>> {
  const params = date ? { date } : {}
  return await api.get("/alimentos", { params })
}

/**
 * Cria uma nova refeição
 */
export async function createMeal(meal: CreateMealPayload): Promise<AxiosResponse> {
  return await api.post("/alimentos", meal)
}

/**
 * Atualiza uma refeição
 */
export async function updateMeal(id: string, meal: UpdateMealPayload): Promise<AxiosResponse> {
  return await api.put(`/alimentos/${id}`, meal)
}

/**
 * Deleta uma refeição
 */
export async function deleteMeal(id: string): Promise<AxiosResponse> {
  return await api.delete(`/alimentos/${id}`)
}

// ==================== PLANO ALIMENTAR ====================

/**
 * Busca plano alimentar do paciente (deprecated - usar getPlans)
 */
export async function getMealPlan(): Promise<AxiosResponse<MealPlanResponse>> {
  return await api.get("/meal-plan")
}

/**
 * Busca substituições permitidas
 */
export async function getSubstitutions(): Promise<AxiosResponse<SubstitutionsResponse>> {
  return await api.get("/meal-plan/substitutions")
}

/**
 * Busca observações do nutricionista
 */
export async function getNutritionistNotes(): Promise<AxiosResponse<NutritionistNotesResponse>> {
  return await api.get("/meal-plan/notes")
}

// ==================== PLANS (NOVO) ====================

/**
 * Busca lista de planos disponíveis
 */
export async function getPlans(): Promise<AxiosResponse<PlansListResponse>> {
  return await api.get("/plans")
}

/**
 * Busca detalhes de um plano específico
 */
export async function getPlanById(id: string): Promise<AxiosResponse<PlanDetailResponse>> {
  return await api.get(`/plans/${id}`)
}

// ==================== EVOLUÇÃO ====================

/**
 * Busca dados de evolução de peso
 */
export async function getWeightEvolution(period: string = "30D"): Promise<AxiosResponse<WeightEvolutionResponse>> {
  return await api.get("/evolution/weight", { params: { period } })
}

/**
 * Busca dados de calorias vs meta
 */
export async function getCaloriesEvolution(period: string = "30D"): Promise<AxiosResponse<CaloriesEvolutionResponse>> {
  return await api.get("/evolution/calories", { params: { period } })
}

// ==================== CHECK-INS ====================

/**
 * Busca histórico de check-ins
 */
export async function getCheckins(): Promise<AxiosResponse<CheckinsResponse>> {
  return await api.get("/checkins")
}

/**
 * Cria um novo check-in
 */
export async function createCheckin(data: CreateCheckinPayload): Promise<AxiosResponse> {
  return await api.post("/checkins", data)
}

/**
 * Atualiza um check-in
 */
export async function updateCheckin(id: string, data: Partial<CreateCheckinPayload>): Promise<AxiosResponse> {
  return await api.put(`/checkins/${id}`, data)
}

/**
 * Deleta um check-in
 */
export async function deleteCheckin(id: string): Promise<AxiosResponse> {
  return await api.delete(`/checkins/${id}`)
}

// ==================== CONFIGURAÇÕES ====================

/**
 * Busca perfil do usuário
 */
export async function getUserProfile(userId?: string): Promise<AxiosResponse<ProfileResponse>> {
  // Se userId for fornecido, busca dados do usuário específico
  if (userId) {
    return await api.get(`/users/${userId}`)
  }
  // Fallback para endpoint genérico de perfil
  return await api.get("/users/me")
}

/**
 * Atualiza perfil do usuário
 */
export async function updateUserProfile(userId: string, data: UpdateProfilePayload): Promise<AxiosResponse<ProfileResponse>> {
  return await api.put(`/users/${userId}`, data)
}

/**
 * Atualiza configurações de notificação
 */
export async function updateNotificationSettings(settings: Partial<{
  emailNotifications?: boolean
  pushNotifications?: boolean
  reminderTime?: string
  mealReminders?: boolean
  waterReminders?: boolean
  dailySummary?: boolean
  planUpdates?: boolean
}>): Promise<AxiosResponse<NotificationSettingsResponse>> {
  return await api.put("/profile/notifications", settings)
}

/**
 * Altera senha
 */
export async function changePassword(data: ChangePasswordPayload): Promise<AxiosResponse> {
  return await api.post("/profile/change-password", data)
}

// ==================== NUTRICIONISTA ====================

/**
 * Busca estatísticas do dashboard do nutricionista
 */
export async function getNutricionistaDashboardStats(): Promise<AxiosResponse<DashboardStatsResponse>> {
  return await api.get("/analytics/dashboard")
}

/**
 * Busca dados de engajamento dos pacientes
 */
export async function getEngagementData(period: string = "weekly"): Promise<AxiosResponse<EngagementResponse>> {
  return await api.get("/nutricionista/dashboard/engagement", { params: { period } })
}

/**
 * Busca alertas inteligentes
 */
export async function getIntelligentAlerts(): Promise<AxiosResponse<AlertsResponse>> {
  return await api.get("/nutricionista/dashboard/alerts")
}

/**
 * Busca lista de pacientes (apenas para nutricionista)
 */
export async function getPatients(nutritionistId?: string): Promise<AxiosResponse<PatientsResponse>> {
  // Se o nutritionistId for fornecido, usa o endpoint correto
  if (nutritionistId) {
    return await api.get(`/patients/nutritionist/${nutritionistId}`)
  }
  // Fallback para o endpoint antigo se não for fornecido
  return await api.get("/nutricionista/patients")
}

/**
 * Busca detalhes de um paciente
 */
export async function getPatient(id: string): Promise<AxiosResponse<PatientDetailsResponse>> {
  return await api.get(`/nutricionista/patients/${id}`)
}

/**
 * Cria plano alimentar para um paciente
 */
export async function createMealPlanForPatient(patientId: string, plan: MealPlanResponse["data"]): Promise<AxiosResponse> {
  return await api.post(`/nutricionista/patients/${patientId}/meal-plan`, plan)
}

// ==================== HELPERS ====================

/**
 * Transforma dados da API de pacientes para o formato esperado pela interface
 */
export function transformPatientData(apiPatient: ApiPatientRecord): Patient {
  // Calcula o status baseado no último check-in
  const getStatus = (lastCheckin?: string): "ativo" | "atencao" | "inativo" => {
    if (!lastCheckin) return "inativo"

    const lastCheckinDate = new Date(lastCheckin)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - lastCheckinDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays <= 3) return "ativo"
    if (diffInDays <= 14) return "atencao"
    return "inativo"
  }

  // Formata a data do último check-in
  const formatLastCheckin = (lastCheckin?: string): string => {
    if (!lastCheckin) return "Nunca"

    const lastCheckinDate = new Date(lastCheckin)
    const now = new Date()
    const diffInMs = now.getTime() - lastCheckinDate.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Hoje"
    if (diffInDays === 1) return "Ontem"
    if (diffInDays < 7) return `Há ${diffInDays} dias`
    if (diffInDays < 30) return `Há ${Math.floor(diffInDays / 7)} semanas`
    return `Há ${Math.floor(diffInDays / 30)} meses`
  }

  // Determina alertas baseado no status e dados
  const getAlerts = (status: string): AlertType[] => {
    const alerts: AlertType[] = []

    if (status === "inativo") {
      alerts.push("sem-checkin")
    }
    if (status === "atencao") {
      alerts.push("baixo-engajamento")
    }

    return alerts
  }

  const lastCheckin = apiPatient.updatedAt || apiPatient.createdAt
  const status = getStatus(lastCheckin)

  return {
    id: apiPatient.id || apiPatient.userId,
    name: apiPatient.name || "Paciente",
    email: apiPatient.email || "",
    phone: apiPatient.phone,
    age: apiPatient.age,
    goal: apiPatient.goals?.[0] || "",
    lastCheckin: formatLastCheckin(lastCheckin),
    status,
    alerts: getAlerts(status),
    avatar: apiPatient.avatar,
    createdAt: apiPatient.createdAt,
  }
}
