import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import * as api from "@/app/services/api"
import type {
  DailySummaryResponse,
  TipOfTheDayResponse,
  MealsResponse,
  WeightEvolutionResponse,
  CaloriesEvolutionResponse,
  CheckinsResponse,
  MealPlanResponse,
  SubstitutionsResponse,
  NutritionistNotesResponse,
  ProfileResponse,
  DashboardStatsResponse,
  EngagementResponse,
  AlertsResponse,
  PatientsResponse,
  PatientDetailsResponse,
  CreateMealPayload,
  UpdateMealPayload,
  CreateCheckinPayload,
  UpdateProfilePayload,
} from "@/types"

// ==================== QUERY KEYS ====================
export const queryKeys = {
  // Dashboard
  dailySummary: (userId: string) => ["dailySummary", userId] as const,
  tipOfTheDay: () => ["tipOfTheDay"] as const,

  // Meals
  meals: (date?: string) => ["meals", date] as const,

  // Evolution
  weightEvolution: (period: string) => ["weightEvolution", period] as const,
  caloriesEvolution: (period: string) => ["caloriesEvolution", period] as const,

  // Check-ins
  checkins: () => ["checkins"] as const,

  // Meal Plan
  mealPlan: () => ["mealPlan"] as const,
  substitutions: () => ["substitutions"] as const,
  nutritionistNotes: () => ["nutritionistNotes"] as const,

  // Profile
  profile: () => ["profile"] as const,

  // Nutricionista
  dashboardStats: () => ["dashboardStats"] as const,
  engagement: (period: string) => ["engagement", period] as const,
  alerts: () => ["alerts"] as const,
  patients: () => ["patients"] as const,
  patient: (id: string) => ["patient", id] as const,
}

// ==================== DASHBOARD QUERIES ====================

export function useDailySummary(
  userId: string,
  options?: Omit<UseQueryOptions<DailySummaryResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.dailySummary(userId),
    queryFn: async () => {
      const response = await api.getDailySummary(userId)
      return response.data
    },
    enabled: !!userId,
    ...options,
  })
}

export function useTipOfTheDay(
  options?: Omit<UseQueryOptions<TipOfTheDayResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.tipOfTheDay(),
    queryFn: async () => {
      const response = await api.getTipOfTheDay()
      return response.data
    },
    ...options,
  })
}

// ==================== MEALS QUERIES ====================

export function useMeals(
  date?: string,
  options?: Omit<UseQueryOptions<MealsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.meals(date),
    queryFn: async () => {
      const response = await api.getMeals(date)
      return response.data
    },
    ...options,
  })
}

export function useCreateMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (meal: CreateMealPayload) => api.createMeal(meal),
    onSuccess: () => {
      // Invalidate meals query to refetch
      queryClient.invalidateQueries({ queryKey: ["meals"] })
    },
  })
}

export function useUpdateMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, meal }: { id: string; meal: UpdateMealPayload }) =>
      api.updateMeal(id, meal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] })
    },
  })
}

export function useDeleteMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.deleteMeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] })
    },
  })
}

// ==================== EVOLUTION QUERIES ====================

export function useWeightEvolution(
  period: string = "30D",
  options?: Omit<UseQueryOptions<WeightEvolutionResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.weightEvolution(period),
    queryFn: async () => {
      const response = await api.getWeightEvolution(period)
      return response.data
    },
    ...options,
  })
}

export function useCaloriesEvolution(
  period: string = "30D",
  options?: Omit<UseQueryOptions<CaloriesEvolutionResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.caloriesEvolution(period),
    queryFn: async () => {
      const response = await api.getCaloriesEvolution(period)
      return response.data
    },
    ...options,
  })
}

// ==================== CHECK-INS QUERIES ====================

export function useCheckins(
  options?: Omit<UseQueryOptions<CheckinsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.checkins(),
    queryFn: async () => {
      const response = await api.getCheckins()
      return response.data
    },
    ...options,
  })
}

export function useCreateCheckin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCheckinPayload) => api.createCheckin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins() })
    },
  })
}

// ==================== MEAL PLAN QUERIES ====================

export function useMealPlan(
  options?: Omit<UseQueryOptions<MealPlanResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.mealPlan(),
    queryFn: async () => {
      const response = await api.getMealPlan()
      return response.data
    },
    ...options,
  })
}

export function useSubstitutions(
  options?: Omit<UseQueryOptions<SubstitutionsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.substitutions(),
    queryFn: async () => {
      const response = await api.getSubstitutions()
      return response.data
    },
    ...options,
  })
}

export function useNutritionistNotes(
  options?: Omit<UseQueryOptions<NutritionistNotesResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.nutritionistNotes(),
    queryFn: async () => {
      const response = await api.getNutritionistNotes()
      return response.data
    },
    ...options,
  })
}

// ==================== PROFILE QUERIES ====================

export function useProfile(
  userId?: string,
  options?: Omit<UseQueryOptions<ProfileResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.profile(),
    queryFn: async () => {
      const response = await api.getUserProfile(userId)
      return response.data
    },
    enabled: !!userId,
    ...options,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateProfilePayload }) =>
      api.updateUserProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile() })
    },
  })
}

// ==================== NUTRICIONISTA QUERIES ====================

export function useDashboardStats(
  options?: Omit<UseQueryOptions<DashboardStatsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.dashboardStats(),
    queryFn: async () => {
      const response = await api.getNutricionistaDashboardStats()
      return response.data
    },
    ...options,
  })
}

export function useEngagement(
  period: string = "weekly",
  options?: Omit<UseQueryOptions<EngagementResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.engagement(period),
    queryFn: async () => {
      const response = await api.getEngagementData(period)
      return response.data
    },
    ...options,
  })
}

export function useAlerts(
  options?: Omit<UseQueryOptions<AlertsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.alerts(),
    queryFn: async () => {
      const response = await api.getIntelligentAlerts()
      return response.data
    },
    ...options,
  })
}

export function usePatients(
  options?: Omit<UseQueryOptions<PatientsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.patients(),
    queryFn: async () => {
      const response = await api.getPatients()
      return response.data
    },
    ...options,
  })
}

export function usePatient(
  id: string,
  options?: Omit<UseQueryOptions<PatientDetailsResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.patient(id),
    queryFn: async () => {
      const response = await api.getPatient(id)
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}
