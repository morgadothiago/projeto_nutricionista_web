import { DoctorRegisterPayload, RegisterFormData } from "@/types"
import type { AnamneseFormData } from "@/types/anamnese"
import Axios from "axios"

export const api = Axios.create({
  baseURL: "https://back-st1k.onrender.com",
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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
export async function getDailySummary(pacientId: string) {
  return await api.get(`/metas-nutricionais/paciente/${pacientId}/resumo-diario`)
}

/**
 * Busca dica do dia
 */
export async function getTipOfTheDay() {
  return await api.get("/dashboard/tip-of-day")
}

// ==================== DIÁRIO ALIMENTAR ====================

/**
 * Busca refeições do dia
 */
export async function getMeals(date?: string) {
  const params = date ? { date } : {}
  return await api.get("/alimentos", { params })
}

/**
 * Cria uma nova refeição
 */
export async function createMeal(meal: {
  time: string
  name: string
  foods: Array<{
    name: string
    portion: string
    carbs: number
    protein: number
    fat: number
    calories: number
  }>
}) {
  return await api.post("/alimentos", meal)
}

/**
 * Atualiza uma refeição
 */
export async function updateMeal(id: string, meal: any) {
  return await api.put(`/alimentos/${id}`, meal)
}

/**
 * Deleta uma refeição
 */
export async function deleteMeal(id: string) {
  return await api.delete(`/alimentos/${id}`)
}

// ==================== PLANO ALIMENTAR ====================

/**
 * Busca plano alimentar do paciente
 */
export async function getMealPlan() {
  return await api.get("/meal-plan")
}

/**
 * Busca substituições permitidas
 */
export async function getSubstitutions() {
  return await api.get("/meal-plan/substitutions")
}

/**
 * Busca observações do nutricionista
 */
export async function getNutritionistNotes() {
  return await api.get("/meal-plan/notes")
}

// ==================== EVOLUÇÃO ====================

/**
 * Busca dados de evolução de peso
 */
export async function getWeightEvolution(period: string = "30D") {
  return await api.get("/evolution/weight", { params: { period } })
}

/**
 * Busca dados de calorias vs meta
 */
export async function getCaloriesEvolution(period: string = "30D") {
  return await api.get("/evolution/calories", { params: { period } })
}

// ==================== CHECK-INS ====================

/**
 * Busca histórico de check-ins
 */
export async function getCheckins() {
  return await api.get("/checkins")
}

/**
 * Cria um novo check-in
 */
export async function createCheckin(data: {
  weight: number
  waist: number
  hip: number
  bodyFat: number
  notes: string
}) {
  return await api.post("/checkins", data)
}

/**
 * Atualiza um check-in
 */
export async function updateCheckin(id: string, data: any) {
  return await api.put(`/checkins/${id}`, data)
}

/**
 * Deleta um check-in
 */
export async function deleteCheckin(id: string) {
  return await api.delete(`/checkins/${id}`)
}

// ==================== CONFIGURAÇÕES ====================

/**
 * Busca perfil do usuário
 */
export async function getUserProfile() {
  return await api.get("/profile")
}

/**
 * Atualiza perfil do usuário
 */
export async function updateUserProfile(data: {
  name?: string
  email?: string
  age?: number
  height?: number
  goal?: string
  targetWeight?: number
}) {
  return await api.put("/profile", data)
}

/**
 * Atualiza configurações de notificação
 */
export async function updateNotificationSettings(settings: {
  mealReminders?: boolean
  waterReminders?: boolean
  dailySummary?: boolean
  planUpdates?: boolean
}) {
  return await api.put("/profile/notifications", settings)
}

/**
 * Altera senha
 */
export async function changePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  return await api.post("/profile/change-password", data)
}

// ==================== NUTRICIONISTA ====================

/**
 * Busca lista de pacientes (apenas para nutricionista)
 */
export async function getPatients() {
  return await api.get("/nutricionista/patients")
}

/**
 * Busca detalhes de um paciente
 */
export async function getPatient(id: string) {
  return await api.get(`/nutricionista/patients/${id}`)
}

/**
 * Cria plano alimentar para um paciente
 */
export async function createMealPlanForPatient(patientId: string, plan: any) {
  return await api.post(`/nutricionista/patients/${patientId}/meal-plan`, plan)
}
