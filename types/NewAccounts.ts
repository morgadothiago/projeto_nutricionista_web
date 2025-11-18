/**
 * Tipos relacionados a cadastro de novas contas
 */

/**
 * Tipos de usuário no sistema
 */
export type UserRole = "nutricionista" | "paciente"

/**
 * Interface para os dados do formulário de cadastro
 */
export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  name?: string
  phone?: string
}

/**
 * Interface para validação do formulário de cadastro
 */
export interface RegisterFormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
  phone?: string
  general?: string
}

/**
 * Interface para o payload de cadastro enviado à API
 */
export interface RegisterPayload {
  email: string
  password: string
  name?: string
  phone?: string
  role?: UserRole
}

/**
 * Interface para a resposta de cadastro da API
 */
export interface RegisterResponse {
  id: string
  email: string
  name?: string
  phone?: string
  role: UserRole
  message?: string
  createdAt?: string
}

/**
 * Interface para o estado do formulário de cadastro
 */
export interface RegisterFormState {
  formData: RegisterFormData
  errors: RegisterFormErrors
  isLoading: boolean
  isSubmitted: boolean
}
