/**
 * API Response Types
 * Tipos para todas as respostas da API
 */

// Dashboard - Daily Summary
export interface MacroNutrient {
  current: number
  target: number
}

export interface DailySummaryData {
  currentCalories: number
  targetCalories: number
  macros: {
    carbs: MacroNutrient
    protein: MacroNutrient
    fat: MacroNutrient
  }
}

export interface DailySummaryResponse {
  data: DailySummaryData
  success: boolean
}

// Metas Nutricionais - Resumo Diário
export interface NutritionalMetrics {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
  fibras: number
  agua: number
}

export interface NutritionalExceeded {
  calorias: boolean
  proteinas: boolean
  carboidratos: boolean
  gorduras: boolean
  fibras: boolean
  agua: boolean
}

export interface NutritionalGoalsResponse {
  date: string
  totals: NutritionalMetrics
  goals: NutritionalMetrics
  remaining: NutritionalMetrics
  exceeded: NutritionalExceeded
}

// Meals / Alimentos
export interface Food {
  name: string
  portion: string
  carbs: number
  protein: number
  fat: number
  calories: number
}

export interface Meal {
  id?: string
  time: string
  name: string
  foodCount: number
  calories: number
  foods: Food[]
  date?: string
}

export interface MealsResponse {
  data: Meal[]
  success: boolean
}

export interface CreateMealPayload {
  time: string
  name: string
  foods: Food[]
  date?: string
}

export interface UpdateMealPayload extends CreateMealPayload {
  id: string
}

// Weight Evolution
export interface WeightDataPoint {
  date: string
  weight: number
}

export interface WeightEvolutionResponse {
  data: WeightDataPoint[]
  success: boolean
}

export interface CaloriesDataPoint {
  date: string
  consumed: number
  target: number
}

export interface CaloriesEvolutionResponse {
  data: CaloriesDataPoint[]
  success: boolean
}

// Check-ins
export interface CheckinData {
  id: string
  date: string
  weight: number
  waist?: number
  hip?: number
  chest?: number
  photos?: string[]
  notes?: string
}

export interface CheckinsResponse {
  data: CheckinData[]
  success: boolean
}

export interface CreateCheckinPayload {
  date: string
  weight: number
  waist?: number
  hip?: number
  chest?: number
  photos?: string[]
  notes?: string
}

// Meal Plan (deprecated - usar Plans)
export interface MealPlanItem {
  time: string
  meal: string
  foods: string[]
  calories: number
}

export interface MealPlanResponse {
  data: {
    plan: MealPlanItem[]
    startDate: string
    endDate: string
  }
  success: boolean
}

export interface Substitution {
  original: string
  alternatives: string[]
}

export interface SubstitutionsResponse {
  data: Substitution[]
  success: boolean
}

export interface NutritionistNote {
  id: string
  date: string
  content: string
  author: string
}

export interface NutritionistNotesResponse {
  data: NutritionistNote[]
  success: boolean
}

// Plans (novo)
export interface Plan {
  id: string
  name: string
  description: string
  audience: string
  price: number
  billingCycle: string
  benefits: string[]
  discountPercentage: number
  createdAt: string
  updatedAt: string
}

export interface PlansListResponse {
  data: Plan[]
  success: boolean
}

export interface PlanDetailResponse {
  data: Plan
  success: boolean
}

// Profile
export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  whatsappNumber?: string
  dateOfBirth?: string
  avatar?: string
  role: "paciente" | "nutricionista"
  createdAt: string
}

export interface ProfileResponse {
  data: UserProfile
  success: boolean
}

export interface UpdateProfilePayload {
  name?: string
  email?: string
  phone?: string
  whatsappNumber?: string
  dateOfBirth?: string
  avatar?: string
  age?: number
  height?: number
  goal?: string
  targetWeight?: number
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  reminderTime?: string
}

export interface NotificationSettingsResponse {
  data: NotificationSettings
  success: boolean
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

// Nutricionista - Dashboard Stats
export interface DashboardStats {
  activePatients: number
  activePatientsChange?: string
  monthlyRevenue: number
  revenueChange?: string
  totalConsultations: number
  consultationsChange?: string
  averageAdherence: number
  adherenceChange?: string
}

export interface DashboardStatsResponse {
  data: DashboardStats
  success: boolean
}

// Nutricionista - Engagement
export interface EngagementDataPoint {
  week: string
  engagement: number
}

export interface EngagementData {
  data: EngagementDataPoint[]
  weekEngagement: number
  engagedPatients: number
  totalPatients: number
}

export interface EngagementResponse {
  data: EngagementData
  success: boolean
}

// Nutricionista - Alerts
export type AlertType =
  | "baixo-engajamento"
  | "excesso-calorias"
  | "deficit-calorico"
  | "peso-inconsistente"
  | "meta-nao-atingida"
  | "sem-checkin"

export type AlertSeverity = "info" | "warning" | "critical"

export interface Alert {
  id: string
  patientId: string
  patientName: string
  type: AlertType
  message: string
  severity: AlertSeverity
  date: string
}

export interface AlertsResponse {
  data: Alert[]
  success: boolean
}

// Nutricionista - Patients
export type PatientStatus = "ativo" | "atencao" | "inativo"

// Tipo para dados brutos da API (tabela patients)
export interface ApiPatientRecord {
  id: string
  userId: string
  assignedNutritionistId: string
  healthMetrics: unknown[]
  mealLogs: unknown[]
  reminders: unknown[]
  goals: string[]
  createdAt: string
  updatedAt: string
  // Dados do usuário (se populado via JOIN ou endpoint separado)
  name?: string
  email?: string
  phone?: string
  age?: number
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  email: string
  phone?: string
  age?: number
  goal?: string
  lastCheckin: string
  status: PatientStatus
  alerts?: AlertType[]
  avatar?: string
  createdAt: string
}

export interface PatientsResponse {
  data: {
    patients: Patient[]
    total: number
  }
  success: boolean
}

export interface PatientDetailsResponse {
  data: Patient & {
    currentWeight?: number
    initialWeight?: number
    targetWeight?: number
    height?: number
    bmi?: number
    dailyCalories?: number
  }
  success: boolean
}

// Tip of the Day
export interface TipOfTheDayResponse {
  data: {
    tip: string
    category: string
  }
  success: boolean
}

// Generic API Error
export interface ApiError {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
}
